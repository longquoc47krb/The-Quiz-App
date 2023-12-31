
import { DEFAULT_USER_AVATAR } from 'src/configs/constants';
import { LoginType, Role } from 'src/configs/enum';

import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Result } from 'src/modules/result/entities/result.entity';
import { Token } from 'src/modules/token/entities/token.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


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
    @Column({ nullable: true })
    password: string;
    @Column({ type: 'simple-array' })
    roles: Role[];
    @Column({ default: DEFAULT_USER_AVATAR })
    avatar: string;
    createdQuizzes: any;
    @Column({ default: LoginType.EmailPassword })
    loginType: LoginType;
    @Column({ default: false })
    verified: boolean;
    @Column({ nullable: true })
    token_id: number;
    @OneToOne(() => Token, token => token.user)
    @JoinColumn({ name: 'token_id' })
    token: Token;

    @OneToMany(() => Quiz, quiz => quiz.author)
    quizzes: Quiz[];

    @OneToMany(() => Result, result => result.player)
    results: Result[];

}
