/* eslint-disable prettier/prettier */
import { UserRole } from 'src/configs/enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { Quiz } from 'src/quiz/quiz.entity';
import { DEFAULT_USER_AVATAR } from 'src/configs/constants';


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

  @Column({ nullable: true })
  settings: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ default: true })
  active: boolean;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: DEFAULT_USER_AVATAR })
  avatar: string;
  createdQuizzes: any;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
