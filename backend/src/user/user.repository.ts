/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_USER_AVATAR } from 'src/configs/constants';
import { RegisterUserDTO } from './dtos/registerUser.dto';

@Injectable()
export class UserRepository {
    findOne(id: number) {
        return this.userRepository.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }
    getUserByEmail(email: string) {
        return this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }
    getUserByUsername(username: string) {
        return this.userRepository.createQueryBuilder('user')
            .where('user.username = :username', { username })
            .getOne();
    }
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async findByEmailOrUsername(identifier: string): Promise<User | undefined> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.email = :identifier OR user.username = :identifier', { identifier })
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
