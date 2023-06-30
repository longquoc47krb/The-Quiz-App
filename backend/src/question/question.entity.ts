/* eslint-disable prettier/prettier */
import { Quiz } from 'src/quiz/quiz.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column('simple-array')
    options: string[];

    @Column()
    correctOption: number;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;
}
