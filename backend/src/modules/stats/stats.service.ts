import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer, Result } from '../result/entities/result.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class StatsService {
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
    async getDailyCountsByQuizId(quizId: number): Promise<{ date: string; count: number }[]> {
        const query = `
              SELECT DATE(startTime) as date, COUNT(*) as count
              FROM result
              WHERE result.quiz_id = ${quizId}
              GROUP BY date
              ORDER BY date;
            `;

        const result = await this.resultRepository.query(query);

        return result.map(row => ({
            date: row.date,
            count: row.count,
        }));
    }
}
