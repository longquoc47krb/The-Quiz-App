import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Answer, Result } from './entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/utils/interface/response.dto';
import { User } from '../user/entities/user.entity';
import { Quiz } from '../quiz/entities/quiz.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private userService: UserService) { }
  async create(createResultDto: CreateResultDto) {
    const { result, player_id, quiz_id, ...rest } = createResultDto;

    await this.userService.addCompletedQuiz(player_id, quiz_id);
    if (!Array.isArray(result)) {
      throw new Error('Invalid result format');
    }
    const rstl = new Result();
    rstl.player_id = createResultDto.player_id;
    rstl.quiz_id = createResultDto.quiz_id;
    rstl.startTime = createResultDto.startTime;
    rstl.endTime = createResultDto.endTime;
    const answers: Answer[] = [];
    let score = 0;
    for (const answerDto of createResultDto.result) {
      const answer = new Answer();
      answer.yourChoice = answerDto.yourChoice;
      answer.answer = answerDto.answer;
      answer.correct = answerDto.correct;
      answer.result_id = rstl.id;
      answer.options = answerDto.options
      await this.answerRepository.save(answer);
      answers.push(answer);

      if (answer.correct) {
        score += 1000; // Adjust score calculation as needed
      }
    }
    rstl.result = answers;
    rstl.score = score;
    await this.resultRepository.save(rstl);
    return ResponseDto.createSuccess('Successfully saved quiz');

  }
  async findAllByPlayerId(userId: number) {
    return await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('quiz.questions', 'questions').leftJoinAndSelect('result.result', 'answer').where('result.player_id = :userId', { userId }).getMany();
  }
  async findAll() {
    // return this.resultRepository.find({
    //   relations: ['player', 'quiz', 'result'], // Load related entities
    // });
    return await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('quiz.questions', 'questions').leftJoinAndSelect('result.result', 'answer').getMany();
  }

  async findOne(id: number) {
    const result = await this.resultRepository.createQueryBuilder('result').leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('quiz.questions', 'questions').leftJoinAndSelect('result.result', 'answer').where('result.id = :id', { id }).getOne();

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found.`);
    }

    return result;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
