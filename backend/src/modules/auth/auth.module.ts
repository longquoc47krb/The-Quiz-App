
import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../mail/mail.service';

@Module({
    imports: [
        UserModule,
        SharedModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, MailService],
})
export class AuthModule { }