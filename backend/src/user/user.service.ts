/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) { }

    async registerUser(registerUserDTO: RegisterUserDTO): Promise<void> {
        // Implement your registration logic here
        // Example: Save the user to the database using the user repository
        await this.userRepository.createUser(registerUserDTO);
    }
    async login(loginUserDTO: LoginUserDTO): Promise<string> {
        const { email, password, username } = loginUserDTO;
        let user: any;

        // Find the user by email or username
        if (email) {
            user = await this.userRepository.findByEmailOrUsername(email, username);
        } else if (username) {
            user = await this.userRepository.findByEmailOrUsername(email, username);
        } else {
            throw new Error('Email or username must be provided');
        }

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Verify the password
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate and return the JWT token
        const token = this.jwtService.sign({ userId: user.id });
        return token;
    }
}
