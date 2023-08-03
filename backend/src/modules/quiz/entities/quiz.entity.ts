
import { QuizCategory } from "src/common/category.enum";
import { Question } from "src/modules/question/entities/question.entity";
import { User } from "src/modules/user/entities/user.entity";
import { QuizSession } from "src/modules/quiz-session/entities/quiz-session.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('quiz')
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: QuizCategory })
    category: QuizCategory;


    @OneToMany(() => Question, (question) => question.quizId, { cascade: true })
    questions: Question[];

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];


    @Column({ default: 0 })
    totalParticipants: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => QuizSession, quizSession => quizSession.quiz)
    quizSessions: QuizSession[];

    @ManyToOne(() => User, user => user.quizzes)
    @JoinColumn({ name: 'authorId' })
    author: User;
}
