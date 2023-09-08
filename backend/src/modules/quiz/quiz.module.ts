
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from 'src/modules/question/entities/question.entity';
import { Result, Answer } from 'src/modules/result/entities/result.entity';
import { UserModule } from 'src/modules/user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Result, Answer]),
    UserModule,
    SharedModule
  ],
  providers: [QuizService], // Add QuizRepository to the providers
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule { }
