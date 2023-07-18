
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Question } from './entities/question.entity';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question]),
    UserModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule { }
