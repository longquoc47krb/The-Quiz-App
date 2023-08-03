

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';
import { QuizResult } from 'src/utils/interface/quiz-result';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { AuthUser, Roles, RolesGuard } from 'src/utils';
import { Role } from 'src/configs/enum';
import { UserResponseDTO } from '../user/dto/user-response.dto';
import { User } from 'src/utils/decorator/user.decorator';
import { User as UserEntity } from '../user/entities/user.entity';
import { userInfo } from 'os';

@ApiTags('Quiz')

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Post()
  @ApiOperation({ summary: 'Create new quiz' })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  create(@Body() createQuizDto: CreateQuizDto, @User() user: UserEntity) {
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
  @Post('submit')
  async submitExam(
    @Body('candidateId') candidateId: number,
    @Body('answers') answers: string[],
  ): Promise<QuizResult> {
    return this.quizService.calculateResults(candidateId, answers);
  }
}
