import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from '../quiz/quiz.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Answer, Result } from '../result/entities/result.entity';
import { Token } from '../token/entities/token.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Result, Answer, Token, User]),
    QuizModule,
    UserModule,
    SharedModule
  ],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule { }
