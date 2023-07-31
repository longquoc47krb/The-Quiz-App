
import { Controller, Post, Body, UnauthorizedException, BadRequestException, UseGuards, Inject, ClassSerializerInterceptor, UseInterceptors, HttpException, HttpStatus, Get, Req, Res, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginUserDTO } from './dto/login-credential.dto';
import { Logger } from 'winston';
import { TokenDto } from './dto/token.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginType } from 'src/configs/enum';
import { CheckUserExistenceDTO } from '../user/dto/user-existence.dto';
import { MailService } from '../mail/mail.service';
import { UpdateUserDTO } from '../user/dto/update-user.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('winston')
        private readonly logger: Logger,
        private authService: AuthService,
        private userService: UserService,
        private readonly mailService: MailService
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
        await this.authService.registerUser({ loginType: LoginType.EmailPassword, verified: false, ...rest });
        await this.mailService.sendWelcomeEmail(registerUserDTO.email, registerUserDTO.username);
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
        const user = req.user;
        const { lastLogin, ...rest } = user;
        const checkUser: CheckUserExistenceDTO = {
            email: user.email,
            username: user.username
        }
        const isExist = await this.userService.checkUserExists(checkUser)
        if (!isExist) {
            const createNewUser: CreateUserDto = {
                name: user.name,
                username: user.username,
                email: user.email,
                password: '',
                avatar: user.avatar,
                roles: user.roles,
                loginType: user.loginType,
                verified: true
            }
            this.logger.info('Created account successfully');
            await this.mailService.sendWelcomeEmail(user.email, user.username);
            await this.userService.createUser(createNewUser)
        }
        const updateUser: UpdateUserDTO = {
            lastLogin: new Date(),
        }
        await this.userService.update(user.id, updateUser);
        const token = this.authService.generateAuthToken(user);
        const { accessToken } = token;
        res.redirect(`${process.env.APP_URL}auth?token=${accessToken}`);

    }
    @ApiOperation({ summary: 'Send verify link to email' })
    @Post('send-verification-email')
    async sendEmail(@Query('email') email: string) {
        await this.authService.sendVerificationEmail(email);
        return { message: 'Sent verification email successfully', success: true };
    }
    @ApiOperation({ summary: 'Verify email' })
    @Post('verify-email')
    async verifyEmail(@Query('code') code: string) {
        await this.authService.verifyEmail(code)
        return { message: 'Verified email', success: true };
    }

}
