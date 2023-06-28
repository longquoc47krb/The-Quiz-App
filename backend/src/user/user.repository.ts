/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_USER_AVATAR } from 'src/configs/constants';
import { RegisterUserDTO } from './dtos/registerUser.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async findByEmailOrUsername(email: string, username: string): Promise<User | undefined> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.email = :email OR user.username = :username', { email, username })
            .getOne();
    }
    async createUser(registerUserDTO: RegisterUserDTO): Promise<void> {
        const { name, username, email, password, role } = registerUserDTO;

        const user = new User();
        user.name = name;
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
        user.avatar = DEFAULT_USER_AVATAR;

        await this.userRepository.save(user);
    }
}
