/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from 'src/configs/enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async registerAccount(name: string, username: string, email: string, password: string): Promise<User> {
        const user = new User();
        user.name = name;
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = UserRole.USER; // Set the default role as 'user'

        return this.userRepository.save(user);
    }

}
