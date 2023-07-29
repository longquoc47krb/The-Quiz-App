/* eslint-disable @typescript-eslint/no-unused-vars */

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { AppRoles } from 'src/app.roles';
import { convertUsersToDTO, mapUserToUserResponseDTO } from "src/common/helpers/convertToDTO";
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDTO } from './dto/user-response.dto';
import { LoginType, Role } from 'src/configs/enum';
import { CheckUserExistenceDTO } from './dto/user-existence.dto';
import { Logger } from 'winston';
@Injectable()
export class UserService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, username, email, password, loginType, avatar, verified } = createUserDto;
    const user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.roles = [Role.User];
    user.avatar = avatar;
    user.password = loginType === LoginType.EmailPassword ? await this.hashPassword(password) : "";
    user.loginType = loginType;
    user.verified = verified;
    console.log({ createUserDto })
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
    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');
    return (user);
  }
  async findByVerificationCode(verificationCode: string) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.verificationCode = :verificationCode', { verificationCode }).getOne();
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
  async checkUserExists(user: CheckUserExistenceDTO) {
    const { email, username } = user;
    const userByEmailExist = await this.userRepository.findOne({ where: { email } });
    const userByUsernameExist = await this.userRepository.findOne({ where: { username } });
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

  async update(id: number, updateUserDto: UpdateUserDTO): Promise<User> {
    const user = await this.getOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Apply the updates from the UpdateUserDTO
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.dateOfBirth) {
      user.dateOfBirth = updateUserDto.dateOfBirth;
    }

    if (updateUserDto.score !== undefined) {
      user.score = updateUserDto.score;
    }

    if (updateUserDto.level !== undefined) {
      user.level = updateUserDto.level;
    }

    if (updateUserDto.completedQuizzes) {
      user.completedQuizzes = updateUserDto.completedQuizzes;
    }

    if (updateUserDto.favoriteQuizzes) {
      user.favoriteQuizzes = updateUserDto.favoriteQuizzes;
    }
    if (updateUserDto.lastLogin) {
      user.lastLogin = updateUserDto.lastLogin;
    }
    if (updateUserDto.verified) {
      user.verified = updateUserDto.verified;
    }
    if (updateUserDto.verificationCode) {
      user.verificationCode = updateUserDto.verificationCode;
    }

    // Similarly, update other properties as needed
    this.logger.info('Updated user successfully');
    return this.userRepository.save(user);
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
