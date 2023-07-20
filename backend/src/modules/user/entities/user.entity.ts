
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { DEFAULT_USER_AVATAR } from 'src/configs/constants';
import { QuizSession } from 'src/modules/quiz-session/entities/quiz-session.entity';
import { Exclude } from 'class-transformer';
import { Role } from 'src/configs/enum';


@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    dateOfBirth: Date;

    @Column({ default: 0 })
    score: number;

    @Column({ default: 1 })
    level: number;

    @ManyToMany(() => Quiz)
    @JoinTable()
    completedQuizzes: Quiz[];

    @ManyToMany(() => Quiz)
    @JoinTable()
    favoriteQuizzes: Quiz[];

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    lastLogin: Date;

    @Column({ default: true })
    active: boolean;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'simple-array' })
    roles: Role[];

    @Column({ default: DEFAULT_USER_AVATAR })
    avatar: string;
    createdQuizzes: any;

    @OneToMany(() => QuizSession, quizSession => quizSession.user)
    quizSessions: QuizSession[];
}
