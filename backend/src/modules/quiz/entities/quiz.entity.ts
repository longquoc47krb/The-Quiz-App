
import { QuizCategory } from "src/common/category.enum";
import { Question } from "src/modules/question/entities/question.entity";
import { Result } from "src/modules/result/entities/result.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('quiz')
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;


    @OneToMany(() => Question, (question) => question.quizId, { cascade: true })
    questions: Question[];

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];

    @OneToMany(() => Result, result => result.quiz)
    results: Result[];

    @Column({ default: 0 })
    totalParticipants: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    authorId: number; // Cột để lưu trữ khóa ngoại

    @ManyToOne(() => User, user => user.quizzes)
    @JoinColumn({ name: 'authorId' }) // Liên kết với cột "authorId"
    author: User; // Thuộc tính để truy cập thông tin User

}
