/* eslint-disable prettier/prettier */
import { QuizCategory } from "src/common/category.enum";
import { Question } from "src/question/entities/question.entity";
import { UserDto } from "src/user/dto/user-hidden-password.dto";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => User, user => user.createdQuizzes)
    @JoinColumn({ name: 'author' })
    author: UserDto; // Assuming the authorId is of type 'number'


    @Column({ default: 0 })
    totalParticipants: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
