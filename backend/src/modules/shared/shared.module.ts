
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../auth/strategies/google.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'google' }),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [GoogleStrategy],
    exports: [
        JwtModule,
    ]
})
export class SharedModule { }