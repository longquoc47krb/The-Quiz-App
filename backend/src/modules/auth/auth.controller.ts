
import { Controller, Post, Body, UnauthorizedException, BadRequestException, UseGuards, Inject, ClassSerializerInterceptor, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginUserDTO } from './dto/login-credential.dto';
import { Logger } from 'winston';
import { TokenDto } from './dto/token.dto';
import { JWT_SECRET } from '../../configs/constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('winston')
        private readonly logger: Logger,
        private authService: AuthService,
        private userService: UserService,
    ) { }
    @ApiOperation({ summary: 'Login account' })
    @Post('login')
    async login(@Body() loginDto: LoginUserDTO): Promise<TokenDto> {
        try {
            return await this.authService.login(loginDto);
        } catch (error) {
            console.log(process.env.JWT_SECRET)
            this.logger.warn('Login attempt failed', loginDto);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async registerUser(@Body() registerUserDTO: CreateUserDto) {
        const isExist = await this.userService.checkUserExists(registerUserDTO)
        if (isExist) {
            throw new BadRequestException('User already registered with email');
        }
        await this.authService.registerUser(registerUserDTO);
        return { message: 'User registered' };
    }
}
