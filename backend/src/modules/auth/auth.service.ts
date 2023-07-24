
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginUserDTO } from 'src/modules/auth/dto/login-credential.dto';
import { UserService } from 'src/modules/user/user.service';
import { TokenDto } from './dto/token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../user/entities/user.entity';
import { UserResponseDTO } from '../user/dto/user-response.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }
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

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!user.active) {
            throw new Error('Inactive user');
        }
        const isMatched = this.userService.comparePassword(password, user);
        if (!isMatched) {
            throw new Error('Invalid credentials');
        }
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
}