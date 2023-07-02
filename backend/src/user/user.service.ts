/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { compare } from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.getUserByUsername(username);

    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne(id)
      .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return user;
  }
  async checkUserExists(user: CreateUserDto) {
    const { email, username } = user;
    const userByEmailExist = await this.userRepository.getUserByEmail(email);
    const userByUsernameExist = await this.userRepository.getUserByUsername(username);
    if (userByEmailExist || userByUsernameExist) {
      return true;
    }
    return false;
  }
  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    const { password, ...rest } = user;
    return rest;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
