/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginType } from 'src/configs/enum';
import { CustomException } from 'src/exception';
import { LoginUserDTO } from 'src/modules/auth/dto/login-credential.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { Token } from '../token/entities/token.entity';
import { TokenService } from '../token/token.service';
import { UpdateUserDTO } from '../user/dto/update-user.dto';
import { UserResponseDTO } from '../user/dto/user-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateTokenDto } from '../token/dto/update-token.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, private jwtService: JwtService,
        private tokenService: TokenService, private mailService: MailService) { }
    async registerUser(registerUserDTO: CreateUserDto): Promise<void> {
        await this.userService.createUser(registerUserDTO);

    }
    async authenticate(token: string): Promise<any> {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userService.getOne(payload.userId);
            return user;
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }
    async login(loginDto: LoginUserDTO): Promise<TokenDto> {
        const { identifier, password } = loginDto;
        const user = await this.userService.findByEmailOrUsername(identifier);
        const { lastLogin, ...rest } = user;
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!user.active) {
            throw new CustomException('Inactive user', HttpStatus.BAD_REQUEST);
        }
        if (user.loginType !== LoginType.EmailPassword) {
            throw new CustomException('Login by Email/Password is not allowed with this email. Please use a different credentials.', HttpStatus.BAD_REQUEST);
        }

        const isMatched = this.userService.comparePassword(password, user);
        if (!isMatched) {
            throw new CustomException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        const updateUser: UpdateUserDTO = {
            lastLogin: new Date(),
            ...rest
        }
        await this.userService.update(user.id, updateUser);
        const authToken: TokenDto = this.generateAuthToken(user);
        return Promise.resolve(authToken);
    }
    public generateAuthToken(user: UserResponseDTO): TokenDto {

        const accessToken = this.jwtService.sign({
            sub: user.id,
            type: 'access',
            email: user.email,
            roles: user.roles,
            loginType: user.loginType
        });

        const refreshToken = this.jwtService.sign({
            sub: user.id,
            type: 'refresh',
        });

        return { accessToken, refreshToken };
    }
    async refreshToken(token: RefreshTokenDto): Promise<TokenDto> {

        let payload: any;

        try {
            payload = this.jwtService.verify(token.refreshToken);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }

        const { userId, type } = payload;

        if (type !== 'refresh') {
            throw new Error('Wrong token type');
        }

        const user = await this.userService.getOne(userId);

        if (!user) {
            throw new Error('Invalid user');
        }

        if (!user.active) {
            throw new Error('Inactive user');
        }

        const authToken = this.generateAuthToken(user);
        return Promise.resolve(authToken);
    }
    async sendVerificationEmail(email: string) {
        try {
            const user = await this.userService.findByEmail(email);

            const existedToken = await this.tokenService.findByUserId(user.id);

            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 15);
            if (user.verified) {
                throw new CustomException('Email is verified', HttpStatus.FORBIDDEN);
            }

            const randomToken = this.generateVerificationToken();
            if (!existedToken) {
                const verificationToken = new Token();
                verificationToken.token = randomToken;
                verificationToken.user = user;
                verificationToken.expirationDate = expirationDate;
                await this.tokenService.create(verificationToken);

                // Associate the token with the user
                user.verificationToken = verificationToken;
                const updateUser: UpdateUserDTO = {
                    verificationToken: user.verificationToken
                };

                // Step 7: Send the verification email and update the user with the verification token
                await this.userService.update(user.id, updateUser);
                // await this.mailService.sendVerificationEmail(user.email, user.verificationToken);
            }
            const updateToken: UpdateTokenDto = {
                token: randomToken,
                expirationDate: expirationDate
            };
            console.log("code:", user.verificationToken.token)
            await this.tokenService.update(existedToken.id, updateToken);

        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }
    }
    async verifyEmail(code: string) {
        const user = await this.userService.findByVerificationCode(code);
        if (!user) {
            throw new CustomException('Inactive user', HttpStatus.BAD_REQUEST);

        }

        if (user.verified) {
            throw new CustomException('User is already verified', HttpStatus.BAD_REQUEST);
        }
        const token = await this.tokenService.findByUserId(user.id);
        const currentTime = new Date();
        if (!token) {
            throw new CustomException('Verification token not found', HttpStatus.BAD_REQUEST);
        }

        if (currentTime > token.expirationDate) {
            throw new CustomException('Expired token', HttpStatus.BAD_REQUEST);
        }
        const update: UpdateUserDTO = {
            verified: true
        }
        await this.userService.update(user.id, update)
    }
    private generateVerificationToken(): string {
        const charset = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * 6);
            otp += charset[randomIndex];
        }
        return otp;
    }
}