
import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('question')

export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 5000 })
    text: string;
    @Column('simple-array')
    options: string[];

    @Column({ nullable: true })
    picture: string;
    @Column()
    correctOption: string;

    @Column({ length: 5000, nullable: true })
    explain: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    @JoinColumn({ name: 'quizId' })
    quizId: number;

}
