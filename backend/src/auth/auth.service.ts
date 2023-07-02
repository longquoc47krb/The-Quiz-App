/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private userService: UserService, private jwtService: JwtService) { }
    async registerUser(registerUserDTO: CreateUserDto): Promise<void> {
        await this.userRepository.createUser(registerUserDTO);

    }
    async login(loginDto: LoginUserDTO) {
        const { username, password } = loginDto;
        const user = await this.userService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
