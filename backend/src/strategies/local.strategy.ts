/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super();
    }

    async validate(email: string, password: string) {
        const user = await this.userService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Login username/email or password does not match.');
        }
        return user;
    }
}