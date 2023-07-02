/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from 'src/question/entities/question.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question]),
    UserModule,
  ],
  providers: [QuizService], // Add QuizRepository to the providers
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule { }
