/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { AppRoles } from 'src/app.roles';
import { convertUsersToDTO, mapUserToUserResponseDTO } from "src/common/helpers/convertToDTO";
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDTO } from './dto/user-response.dto';
import { Role } from 'src/configs/enum';
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
    user.password = await this.hashPassword(password);
    user.roles = [Role.User];

    await this.userRepository.save(user);

  }
  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({ where: { id } })
      .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return mapUserToUserResponseDTO(user);
  }
  async findByEmailOrUsername(identifier: string) {
    // const user = await this.userRepository.createQueryBuilder('user').where('user.username = :identifier', { identifier }).orWhere('user.email = :identifier', { identifier }).getOne();
    const user = await this.userRepository.createQueryBuilder('user').where('user.username = :identifier', { identifier }).orWhere('user.email = :identifier', { identifier }).getOne();
    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');
    return (user);
  }
  async findByUsername(username: string) {
    if (typeof username !== 'string' || username.trim() === '') {
      throw new Error('Invalid username');
    }
    const user = await this.userRepository.createQueryBuilder('user').where("user.username = :username", { username }).getOne();
    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');
    return mapUserToUserResponseDTO(user);
  }
  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne()
    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
  async checkUserExists(user: CreateUserDto) {
    const { email, username } = user;
    const userByEmailExist = await this.userRepository.findOne({ where: { email } });
    const userByUsernameExist = await this.userRepository.findOne({ where: { username } });
    console.log("userByUsernameExist:", userByUsernameExist)
    console.log("userByEmailExist:", userByEmailExist)
    if (userByEmailExist || userByUsernameExist) {
      return true;
    }
    return false;
  }
  async findAll() {
    const users = await this.userRepository.find();
    return convertUsersToDTO(users);
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne()
    // return mapUserToUserResponseDTO(user);
    return (user);

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async hashPassword(password: string) {
    if (!password) {
      return;
    }
    const hastPassword = await hash(password, 10);
    return hastPassword;
  }
  async comparePassword(password: string, user: User): Promise<boolean> {
    return compare(password, user.password);
  }
}
