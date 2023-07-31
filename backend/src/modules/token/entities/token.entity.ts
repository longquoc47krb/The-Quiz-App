import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    token: string;

    @OneToOne(() => User, user => user.verificationToken)
    @JoinColumn()
    user: User;

    @Column({ nullable: true })
    expirationDate: Date; // Add the expirationDate field
}
