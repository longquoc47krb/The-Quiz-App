
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        SharedModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }