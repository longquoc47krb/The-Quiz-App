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
import { filterNonNullEmpty, handleScorePerQuestion } from 'src/common/helpers/utils';

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
      answer.options = filterNonNullEmpty(answerDto.options)
      answer.time = answerDto.time;
      answer.title = answerDto.title;
      answer.explain = answerDto.explain
      answer.picture = answerDto.picture
      await this.answerRepository.save(answer);
      answers.push(answer);
      score += handleScorePerQuestion(answer.time, answer.correct);
    }
    rstl.result = answers;
    rstl.score = score;
    await this.resultRepository.save(rstl);
    return ResponseDto.createSuccess('Successfully saved quiz');

  }
  async findAllByPlayerId(userId: number) {
    const results = await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('result.result', 'answer').where('result.player_id = :userId', { userId }).getMany();
    if (results) {
      return new ResponseDto(200, 'Fetched results successfully', results)
    }
    return new ResponseDto(400, 'Fetched results failed', [])
  }
  async findAllByQuizId(quizId: number) {
    // const results = await this.resultRepository
    //   .createQueryBuilder('result')
    //   .leftJoinAndSelect('result.player', 'user')
    //   .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('result.result', 'answer').where('result.quiz_id = :quizId', { quizId }).getMany();
    // if (results) {
    //   return new ResponseDto(200, 'Fetched results successfully', results)
    // }
    // return new ResponseDto(400, 'Fetched results failed', [])

    const results = await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz')
      .leftJoinAndSelect('quiz.author', 'author')
      .leftJoinAndSelect('result.result', 'answer')
      .where('result.quiz_id = :quizId', { quizId }).andWhere(
        'NOT EXISTS ' +
        '(SELECT 1 FROM result AS r ' +
        'WHERE r.quiz_id = :quizId AND r.player_id = result.player_id AND r.score > result.score)'
      )
      .getMany();

    if (results) {
      // Create a Set to keep track of unique player_ids
      const uniquePlayerIds = new Set<number>();

      // Create an array to store filtered results
      const filteredResults = [];

      // Iterate through the results and filter out duplicates based on player_id
      for (const result of results) {
        if (!uniquePlayerIds.has(result.player_id)) {
          uniquePlayerIds.add(result.player_id);
          filteredResults.push(result);
        }
      }

      return new ResponseDto(200, 'Fetched results successfully', filteredResults);
    }

    return new ResponseDto(400, 'Fetched results failed', []);
  }
  async findAllByPlayerIdAndQuizId(userId: number, quizId: number) {
    const results = await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('result.result', 'answer').where('result.player_id = :userId AND result.quiz_id = :quizId', { userId, quizId }).getMany();
    if (results) {
      return new ResponseDto(200, 'Fetched results successfully', results)
    }
    return new ResponseDto(400, 'Fetched results failed', [])
  }
  async findAll() {
    // return this.resultRepository.find({
    //   relations: ['player', 'quiz', 'result'], // Load related entities
    // });
    const results = await this.resultRepository
      .createQueryBuilder('result')
      .leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('result.result', 'answer').getMany();
    if (results) {
      return new ResponseDto(200, 'Fetched results successfully', results)
    }
    return new ResponseDto(400, 'Fetched results failed', [])
  }

  async findOne(id: number) {
    const result = await this.resultRepository.createQueryBuilder('result').leftJoinAndSelect('result.player', 'user')
      .leftJoinAndSelect('result.quiz', 'quiz').leftJoinAndSelect('quiz.author', 'author').leftJoinAndSelect('result.result', 'answer').where('result.id = :id', { id }).getOne();

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found.`);
    }

    return new ResponseDto(200, `Fetched result #${id} successfully`, result)
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
