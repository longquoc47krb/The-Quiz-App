/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login account' })
    @Post('login')
    async login(@Body() loginDto: LoginUserDTO) {
        try {
            const token = await this.authService.login(loginDto);
            return token;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

    }

    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    async registerUser(@Body() registerUserDTO: CreateUserDto) {
        const isExist = await this.userService.checkUserExists(registerUserDTO)
        if (isExist) {
            throw new BadRequestException('User already registered with email');
        }
        await this.authService.registerUser(registerUserDTO);
        return { message: 'User registered' };
    }
}
