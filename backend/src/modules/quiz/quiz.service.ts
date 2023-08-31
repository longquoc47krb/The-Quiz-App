
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizCategory } from 'src/common/category.enum';
import { Question } from 'src/modules/question/entities/question.entity';
import { Repository } from 'typeorm';
import { UserResponseDTO } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { ResponseDto } from 'src/utils/interface/response.dto';
import { User } from '../user/entities/user.entity';
import { filterNonNullEmpty } from 'src/common/helpers/utils';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private userService: UserService) { }
  async create(createQuizDto: CreateQuizDto, userJwt: User) {
    const { questions } = createQuizDto;
    const user: User = await this.userService.getOne(userJwt.id)
    const quiz = this.quizRepository.create();
    quiz.category = createQuizDto.category;
    quiz.description = createQuizDto.description;
    quiz.authorId = user.id;
    quiz.title = createQuizDto.title || `${createQuizDto.category} #${quiz.id}`;;
    console.log({ quiz })
    const savedQuestions = [];
    const uniqueQuestionTexts = [];
    for (const questionData of questions) {
      if (uniqueQuestionTexts.includes(questionData.text)) {
        throw new Error(`Duplicated question found: "${questionData.text}"`);
      }
      const question = new Question();
      question.text = questionData.text;
      question.options = filterNonNullEmpty(questionData.options);
      question.correctOption = questionData.correctOption;
      question.quizId = quiz.id;
      question.explain = questionData.explain;
      question.picture = questionData.picture;
      const savedQuestion = await this.questionRepository.save(question);
      savedQuestions.push(savedQuestion);
    }
    quiz.questions = savedQuestions;
    await this.quizRepository.save(quiz);
    return ResponseDto.createSuccess('Successfully saved quiz');
  }

  async findAll() {
    // const quizzes = await this.quizRepository.createQueryBuilder('quiz').leftJoinAndSelect('quiz.questions', 'questions').innerJoinAndSelect('quiz.author', 'user').getMany()
    const quizzes = await this.quizRepository.find({
      relations: ['questions', 'author', 'participants'],
    });
    return quizzes;
  }
  async findByAuthorId(authorId: number) {
    const quizzes = await this.quizRepository.createQueryBuilder('quiz').leftJoinAndSelect('quiz.questions', 'questions').innerJoinAndSelect('quiz.author', 'user').where("quiz.authorId = :authorId", { authorId }).getMany()
    return quizzes
  }
  findOne(id: number) {
    return this.quizRepository.createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions').innerJoinAndSelect('quiz.author', 'user').where('quiz.id = :id', { id })
      .getOne();
  }
  async updateParticipants(quizId: number, participantId: number) {
    const participant = await this.userService.getOne(participantId);
    const existingQuiz = await this.findOne(quizId);

    if (!participant) {
      throw new Error('Participant not found');
    }

    if (!existingQuiz) {
      throw new Error('Quiz not found');
    }

    if (!existingQuiz.participants) {
      existingQuiz.participants = [];
    }

    const participantExists = existingQuiz.participants.some(p => p.id === participant.id);

    if (!participantExists) {
      existingQuiz.participants.push(participant);
      existingQuiz.totalParticipants += 1;
    }

    return this.quizRepository.save(existingQuiz);
  }
  async updateQuiz(quizId: number, updateQuizDto: UpdateQuizDto) {
    const existingQuiz = await this.findOne(quizId);

    if (!existingQuiz) {
      throw new NotFoundException('Quiz not found');
    }

    const updatedQuestions: Question[] = [];

    if (updateQuizDto.questions) {
      for (const updateDto of updateQuizDto.questions) {
        const existingQuestion = existingQuiz.questions.find(
          question => question.id === updateDto.id
        );

        if (existingQuestion) {
          existingQuestion.text = updateDto.text;
          existingQuestion.options = filterNonNullEmpty(updateDto.options);
          existingQuestion.explain = updateDto.explain;
          existingQuestion.correctOption = updateDto.correctOption;
          updatedQuestions.push(existingQuestion);
        }
      }
    }

    if (updateQuizDto.title) {
      existingQuiz.title = updateQuizDto.title;
    }
    if (updateQuizDto.description) {
      existingQuiz.description = updateQuizDto.description;
    }
    if (updateQuizDto.category) {
      existingQuiz.category = updateQuizDto.category;
    }

    return this.quizRepository.save(existingQuiz);
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
  async calculateResults(
    candidateId: number,
    answers: string[],
  ) {
    const candidate = await this.userService.getOne(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    const questions = await this.questionRepository.find();
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      const question = questions[i];
      if (question.correctOption === answers[i]) {
        score++;
      }
    }

    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    return {
      candidateName: candidate.name,
      score,
      totalQuestions,
      percentage,
    };
  }
  async deleteQuizById(quizId: number): Promise<void> {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .where('quiz.id = :quizId', { quizId })
      .getOne();

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found.`);
    }

    // Delete related questions first
    await Promise.all(quiz.questions.map(question => this.questionRepository.remove(question)));

    // Now you can delete the quiz safely
    await this.quizRepository.remove(quiz);
  }
}
