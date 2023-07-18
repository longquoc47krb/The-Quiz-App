
import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';

@Module({
  providers: [QuizSessionService]
})
export class QuizSessionModule { }
