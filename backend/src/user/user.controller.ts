/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login account' })
    @Post('login')
    async login(@Body() loginDto: LoginUserDTO) {
        try {
            const token = await this.userService.login(loginDto);
            return { token };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

    }

    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    async registerUser(@Body() registerUserDTO: RegisterUserDTO) {
        const isExist = await this.userService.checkUserExists(registerUserDTO)
        if (isExist) {
            return { message: 'Email/username existed' };
        }
        await this.userService.registerUser(registerUserDTO);
        return { message: 'User registered' };
    }

}

