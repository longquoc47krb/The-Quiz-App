
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';
import { Quiz } from '../quiz/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Quiz]), TokenModule
  ],
  controllers: [UserController],
  providers: [UserService, Repository<User>, JwtService],
  exports: [UserService, Repository<User>],
})
export class UserModule { }
