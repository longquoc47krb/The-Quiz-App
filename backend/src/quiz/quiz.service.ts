/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/question.entity';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        private userRepository: UserRepository,
    ) { }
    async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
        const { title, description, category, questions, author } = createQuizDto;

        const authorEntity = await this.userRepository.getUserByEmail(author.email);

        const quiz = new Quiz();
        quiz.title = title;
        quiz.description = description;
        quiz.category = category;
        quiz.author = authorEntity;

        const savedQuiz = await this.quizRepository.save(quiz);

        const savedQuestions = await Promise.all(
            questions.map(question => {
                const questionEntity = new Question();
                questionEntity.text = question.text;
                questionEntity.quiz = savedQuiz;
                return this.questionRepository.save(questionEntity);
            }),
        );

        savedQuiz.questions = savedQuestions;

        return savedQuiz;
    }

}
