/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuestionModule } from 'src/question/question.module';
import { QuizRepository } from './quiz.repository';
import { Quiz } from './quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [UserModule, QuestionModule, TypeOrmModule.forFeature([Quiz])],
  providers: [QuizService],
  controllers: [QuizController, UserRepository],
  exports: [QuizService]
})
export class QuizModule { }
