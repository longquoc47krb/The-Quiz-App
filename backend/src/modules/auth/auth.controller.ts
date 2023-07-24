
import { Controller, Post, Body, UnauthorizedException, BadRequestException, UseGuards, Inject, ClassSerializerInterceptor, UseInterceptors, HttpException, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginUserDTO } from './dto/login-credential.dto';
import { Logger } from 'winston';
import { TokenDto } from './dto/token.dto';
import { AuthGuard } from '@nestjs/passport';
import { JWT_SECRET } from 'src/configs/constants';
import jwt from 'jsonwebtoken';
import { LoginType } from 'src/configs/enum';
import { CheckUserExistenceDTO } from '../user/dto/user-existence.dto';
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
            this.logger.warn('Login attempt failed', loginDto);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async registerUser(@Body() registerUserDTO: CreateUserDto) {
        const { loginType, ...rest } = registerUserDTO;
        const checkUser: CheckUserExistenceDTO = {
            email: registerUserDTO.email,
            username: registerUserDTO.username
        }
        const isExist = await this.userService.checkUserExists(checkUser)
        if (isExist) {
            throw new BadRequestException('User already registered with email');
        }
        await this.authService.registerUser({ loginType: LoginType.EmailPassword, ...rest });
        return { message: 'User registered' };
    }
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() {
        // The user will be redirected to the Google login page.
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req, @Res() res) {
        // Handle the callback after Google has authenticated the user.
        // The user information will be available in req.user.
        const user = req.user;
        const { loginType, ...rest } = user;
        const checkUser: CheckUserExistenceDTO = {
            email: user.email,
            username: user.username
        }
        const isExist = await this.userService.checkUserExists(checkUser)
        if (isExist) {
            throw new BadRequestException('User already registered with email');
        }
        const createNewUser: CreateUserDto = { loginType: LoginType.Google, ...rest }
        // await this.userService.createUser(createNewUser);
        console.log({ createNewUser })
        const token = this.authService.generateAuthToken(user);
        const { accessToken } = token;
        res.redirect(`${process.env.REACT_LOCAL_URL}auth?token=${accessToken}`);
    }
}
