import { Module } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { QuizSessionController } from './quiz-session.controller';

@Module({
  controllers: [QuizSessionController],
  providers: [QuizSessionService]
})
export class QuizSessionModule {}
