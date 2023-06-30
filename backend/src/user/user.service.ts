/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { compare } from 'bcryptjs';
import { JwtPayload } from 'src/interface/jwt-payload';
import { roles } from '../app.roles';
@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) { }

    async validateUser(identifier: string, pass: string): Promise<any> {
        const user = await this.userRepository.findByEmailOrUsername(identifier);

        if (user && (await compare(pass, user.password))) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }
    async registerUser(registerUserDTO: RegisterUserDTO): Promise<void> {
        await this.userRepository.createUser(registerUserDTO);

    }
    async login(loginDto: LoginUserDTO) {
        const { identifier, password } = loginDto;
        const user = await this.validateUser(identifier, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async getOne(id: number, userEntity?: User) {
        const user = await this.userRepository
            .findOne(id)
            .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

        if (!user)
            throw new NotFoundException('User does not exists or unauthorized');

        return user;
    }
    async checkUserExists(user: RegisterUserDTO) {
        const { email, username } = user;
        const userExist = await this.userRepository.findByEmailOrUsername(email || username);
        if (userExist) {
            return true;
        }
        return false;
    }
}
