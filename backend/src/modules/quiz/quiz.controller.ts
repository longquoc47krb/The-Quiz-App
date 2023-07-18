

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';
import { QuizResult } from 'src/utils/interface/quiz-result';

@ApiTags('Quiz')

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @ApiOperation({ summary: 'Create new quiz' })
  // @Auth({
  //   resource: AppResource.QUIZ,
  //   action: 'create',
  //   possession: 'own',
  // })
  // @Post()
  // create(@Body() createQuizDto: CreateQuizDto, @User() user: UserDto) {
  //   return this.quizService.create(createQuizDto, user);
  // }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
  @Post('submit')
  async submitExam(
    @Body('candidateId') candidateId: number,
    @Body('answers') answers: string[],
  ): Promise<QuizResult> {
    return this.quizService.calculateResults(candidateId, answers);
  }
}
