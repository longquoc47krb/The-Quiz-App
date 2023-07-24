import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginType, Role } from 'src/configs/enum';
import { JWT_SECRET } from 'src/configs/constants';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
            callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            name: name.givenName + ' ' + name.familyName,
            username: emails[0].value.split('@')[0],
            avatar: photos[0].value,
            loginType: LoginType.Google,
            roles: [Role.User]
        }
        done(null, user);
    }
}