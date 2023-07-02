/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AppResource } from 'src/app.roles';
import { UserDto } from 'src/user/dto/user-hidden-password.dto';

@ApiTags('Quiz')

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @ApiOperation({ summary: 'Create new quiz' })
  @Auth({
    resource: AppResource.QUIZ,
    action: 'create',
    possession: 'own',
  })
  @Post()
  create(@Body() createQuizDto: CreateQuizDto, @User() user: UserDto) {
    return this.quizService.create(createQuizDto, user);
  }

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
}
