/* eslint-disable prettier/prettier */
import { QuizCategory } from 'src/common/category.enum';
import { Question } from 'src/question/question.entity';
import { User } from 'src/user/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: QuizCategory })
    category: QuizCategory;


    @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
    questions: Question[];

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];

    @ManyToOne(() => User, user => user.createdQuizzes)
    @JoinColumn({ name: 'authorId' })
    author: User;

    @Column({ default: 0 })
    totalParticipants: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
