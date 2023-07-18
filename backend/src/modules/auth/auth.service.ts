
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
            // Giải mã token và lấy payload
            const payload = this.jwtService.verify(token);
            // Xử lý và trả về thông tin người dùng từ payload
            const user = await this.userService.getOne(payload.userId);
            return user;
        } catch (error) {
            // Xử lý lỗi khi không thể giải mã token hoặc xác thực người dùng
            throw new Error('Authentication failed');
        }
    }
    async login(loginDto: LoginUserDTO) {
        const { email, password } = loginDto;
        const user = await this.userService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!user.active) {
            throw new Error('Inactive user');
        }

        const authToken: TokenDto = this.generateAuthToken(user);
        return Promise.resolve(authToken);
    }
    /**
  * Generate Auth Token
  * @param user
  */
    private generateAuthToken(user: UserResponseDTO): TokenDto {

        const accessToken = this.jwtService.sign({
            sub: () => user.email,
            type: 'access',
            email: user.email,
            roles: user.roles,
            userId: user.id,
        });

        const refreshToken = this.jwtService.sign({
            sub: () => user.email,
            type: 'refresh',
            userId: user.id,
        });

        return { accessToken, refreshToken };
    }
    /**
   * refresh token
   */
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