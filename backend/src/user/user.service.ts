/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { User } from './entities/user.entity';
import { AppRoles } from 'src/app.roles';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
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
  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({ where: { id } })
      .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return user;
  }
  async findByEmailOrUsername(identifier: string) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.username = :identifier', { identifier }).orWhere('user.email = :identifier', { identifier }).getOne();
    return user;
  }
  async findByUsername(username: string) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.username = :username', { username }).getOne()
    return user;
  }
  async validateUser(email: string, pass: string) {
    const user = await this.findByEmail(email);
    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
  async checkUserExists(user: CreateUserDto) {
    const { email, username } = user;
    const userByEmailExist = await this.userRepository.findOne({ where: { email } });
    const userByUsernameExist = this.userRepository.findOne({ where: { username } });
    if (userByEmailExist || userByUsernameExist) {
      return true;
    }
    return false;
  }
  findAll() {
    return `This action returns all user`;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne()
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
