import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizSessionService } from './quiz-session.service';
import { CreateQuizSessionDto } from './dto/create-quiz-session.dto';
import { UpdateQuizSessionDto } from './dto/update-quiz-session.dto';

@Controller('quiz-session')
export class QuizSessionController {
  constructor(private readonly quizSessionService: QuizSessionService) {}

  @Post()
  create(@Body() createQuizSessionDto: CreateQuizSessionDto) {
    return this.quizSessionService.create(createQuizSessionDto);
  }

  @Get()
  findAll() {
    return this.quizSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizSessionDto: UpdateQuizSessionDto) {
    return this.quizSessionService.update(+id, updateQuizSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizSessionService.remove(+id);
  }
}
