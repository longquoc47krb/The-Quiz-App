
import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Repository, getConnection } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizCategory } from 'src/common/category.enum';
import { Question } from 'src/modules/question/entities/question.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private userService: UserService) { }
  async create(createQuizDto: CreateQuizDto, author: User): Promise<Quiz> {
    const { category, questions } = createQuizDto;
    const quiz = await this.quizRepository.create({ ...createQuizDto, author })
    if (!(category in QuizCategory)) {
      throw new Error(`Invalid category value: ${category}`);
    }

    const savedQuestions = [];
    for (const questionData of questions) {
      const question = new Question();
      question.text = questionData.text;
      question.options = questionData.options;
      question.correctOption = questionData.correctOption;
      question.quizId = quiz.id;

      const savedQuestion = await this.questionRepository.save(question);
      savedQuestions.push(savedQuestion);
    }
    quiz.questions = savedQuestions;
    const savedQuiz = await this.quizRepository.save(quiz);
    return savedQuiz;
  }

  async findAll() {
    const quizzes = await this.quizRepository.find({
      relations: ['author', 'questions'],
    });
    return quizzes;
  }

  findOne(id: number) {
    return this.quizRepository.createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
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
