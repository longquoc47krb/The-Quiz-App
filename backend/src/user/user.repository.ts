/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_USER_AVATAR } from 'src/configs/constants';
import { AppRoles } from 'src/app.roles';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
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

    async findByEmailOrUsername(identifier: string): Promise<User | undefined> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.email = :identifier OR user.username = :identifier', { identifier })
            .getOne();
    }
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const { name, username, email, password } = createUserDto;

        const user = new User();
        user.name = name;
        user.username = username;
        user.email = email;
        user.password = password;
        user.roles = [AppRoles.USER];

        await this.userRepository.save(user);

    }
}
