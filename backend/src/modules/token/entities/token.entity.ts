import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    token: string;

    @ManyToOne(() => User, user => user.token)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ nullable: true })
    expirationDate: Date; // Add the expirationDate field
}
