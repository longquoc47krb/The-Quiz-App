/* eslint-disable @typescript-eslint/no-unused-vars */
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
    constructor(private readonly userRepository: UserRepository) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.getUserByUsername(username);

        if (user && (await compare(pass, user.password))) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
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
        const userByEmailExist = await this.userRepository.getUserByEmail(email);
        const userByUsernameExist = await this.userRepository.getUserByUsername(username);
        if (userByEmailExist || userByUsernameExist) {
            return true;
        }
        return false;
    }
}
