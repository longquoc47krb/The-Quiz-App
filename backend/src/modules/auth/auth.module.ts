
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { SharedModule } from '../shared/shared.module';
import { Token } from '../token/entities/token.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';

@Module({
    imports: [
        UserModule,
        SharedModule,
        TypeOrmModule.forFeature([Token])
    ],
    controllers: [AuthController],
    providers: [AuthService, MailService, Repository<Token>, TokenService],
})
export class AuthModule { }