/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/configs/constants';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository]), PassportModule.register({
    defaultStrategy: 'jwt',
  }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>(JWT_SECRET),
      signOptions: { expiresIn: '60m' },
    }),
  })],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, LocalStrategy, JwtStrategy],
})
export class UserModule { }
