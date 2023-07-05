/* eslint-disable prettier/prettier */

import { User } from 'src/user/entities/user.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity('quiz-session')
export class QuizSession {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.quizSessions)
    user: User;

    @ManyToOne(() => Quiz, quiz => quiz.quizSessions)
    quiz: Quiz;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;
}