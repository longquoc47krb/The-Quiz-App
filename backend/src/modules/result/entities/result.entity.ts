import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty()
    @Column()
    yourChoice: string;

    @ApiProperty()
    @Column()
    answer: string;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({ length: 1000 })
    explain: string;

    @ApiProperty()
    @Column('simple-array')
    options: string[];

    @ApiProperty()
    @Column()
    correct: boolean;

    @ApiProperty()
    @Column()
    time: number;

    @ApiProperty()
    @ManyToOne(() => Result, result => result.result)
    @JoinColumn({ name: 'result_id' })
    result_id: number;
}

@Entity('result')
export class Result {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    player_id: number; // Cột để lưu trữ khóa ngoại

    @ManyToOne(() => User, user => user.results)
    @JoinColumn({ name: 'player_id' })
    player: User; // Thuộc tính để truy cập thông tin User

    @Column({ nullable: false })
    quiz_id: number;

    @ManyToOne(() => Quiz, quiz => quiz.results)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz; // Thuộc tính để truy cập thông tin User

    @ApiProperty({ type: () => Answer, isArray: true })
    @OneToMany(() => Answer, (ans) => ans.result_id)
    result: Answer[];

    @ApiProperty()
    @Column({ type: 'timestamp' })
    startTime: Date;

    @ApiProperty()
    @Column({ type: 'timestamp' })
    endTime: Date;
    @Column()
    score: number;
}
