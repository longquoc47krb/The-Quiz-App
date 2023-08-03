
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private userService: UserService) { }
  async create(createQuizDto: CreateQuizDto, userJwt: User) {
    const { category, questions } = createQuizDto;
    const user: User = await this.userService.findByEmail(userJwt.email);
    console.log({ ...createQuizDto, author: user })
    const quiz = await this.quizRepository.create({ ...createQuizDto, author: user })
    if (!(category in QuizCategory)) {
      throw new Error(`Invalid category value: ${category}`);
    }

    const savedQuestions = [];
    const uniqueQuestionTexts = [];
    for (const questionData of questions) {
      if (uniqueQuestionTexts.includes(questionData.text)) {
        throw new Error(`Duplicated question found: "${questionData.text}"`);
      }
      const question = new Question();
      question.text = questionData.text;
      question.options = questionData.options;
      question.correctOption = questionData.correctOption;
      question.quizId = quiz.id;
      question.explain = questionData.explain;
      const savedQuestion = await this.questionRepository.save(question);
      savedQuestions.push(savedQuestion);
    }
    quiz.questions = savedQuestions;
    await this.quizRepository.save(quiz);
    return ResponseDto.createSuccess('Successfully saved quiz');
  }

  async findAll() {
    const quizzes = await this.quizRepository.createQueryBuilder('quiz').leftJoinAndSelect('quiz.questions', 'questions').innerJoinAndSelect('quiz.author', 'user').getMany()
    // const quizzes = await this.quizRepository.find({
    //   relations: ['questions', ],
    // });
    return quizzes;
  }

  findOne(id: number) {
    return this.quizRepository.createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions').innerJoinAndSelect('quiz.author', 'user')
      .where('quiz.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const { title, description, category } = updateQuizDto;
    // Assuming you have a Quiz entity and repository in your codebase
    const quiz = await this.quizRepository.createQueryBuilder('quiz')
      .where('quiz.id = :id', { id })
      .getOne();

    if (!quiz) {
      throw new Error(`Quiz with ID ${id} not found`);
    }
    if (!(category in QuizCategory)) {
      throw new Error(`Invalid category value: ${category}`);
    }
    // Update the quiz properties based on the values in updateQuizDto
    quiz.title = title;
    quiz.description = description;
    quiz.category = category as QuizCategory
    // Update other properties as needed

    // Create a new question entity
    const newQuestion = new Question()
    // Save the updated quiz to the database
    const updatedQuiz = await this.quizRepository.save(quiz);

    return updatedQuiz;
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
}
