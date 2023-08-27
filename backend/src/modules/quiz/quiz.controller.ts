

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
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
import { ResponseDto } from 'src/utils/interface/response.dto';

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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.deleteQuizById(+id);
  }
  @Post('submit')
  async submitExam(
    @Body('candidateId') candidateId: number,
    @Body('answers') answers: string[],
  ): Promise<QuizResult> {
    return this.quizService.calculateResults(candidateId, answers);
  }
  @Get('author/:id')
  async findByAuthorId(@Param('id') id: string) {
    try {
      const quizzez = await this.quizService.findByAuthorId(+id);
      if (!quizzez) {
        return new ResponseDto(400, 'Not found quiz', [])
      }
      return new ResponseDto(200, 'Successfully fetched quizzes', quizzez);
    } catch (error) {
      return new ResponseDto(400, 'Not found quiz', [])
    }

  }
  @Patch(':id')
  async updateQuiz(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    try {
      return this.quizService.updateQuiz(+id, updateQuizDto);
    } catch (error) {
      return new ResponseDto(400, 'Not found quiz', [])
    }

  }
  @Patch('participant/:id')
  async updateParticipant(@Param('id') id: string, @Query('participantId') participantId: string) {
    try {
      return this.quizService.updateParticipants(+id, +participantId);
    } catch (error) {
      return new ResponseDto(400, 'Not found quiz', [])
    }

  }
}
