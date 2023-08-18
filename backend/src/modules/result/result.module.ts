import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { UserService } from '../user/user.service';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Answer, Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { TokenService } from '../token/token.service';
import { Token } from '../token/entities/token.entity';
import { QuizModule } from '../quiz/quiz.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Result, Answer, Token, User]),
    QuizModule,
    UserModule,
    SharedModule
  ],
  controllers: [ResultController],
  providers: [ResultService, TokenService]
})
export class ResultModule { }
