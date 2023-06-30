/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { Quiz } from './quiz.entity';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) { }

    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Create new quiz' })
    @Post()
    async createQuiz(@Body() createQuizDto: CreateQuizDto) {
        try {
            await this.quizService.createQuiz(createQuizDto);
            return { message: 'Created new quiz successfully' };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

}
