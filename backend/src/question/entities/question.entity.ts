/* eslint-disable prettier/prettier */
import { Quiz } from "src/quiz/entities/quiz.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('question')

export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column('simple-array')
    options: string[];

    @Column()
    correctOption: string;

    @Column()
    explain: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    @JoinColumn({ name: 'quizId' })
    quizId: number;

}
