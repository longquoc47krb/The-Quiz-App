import { join } from 'path';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { Logger } from 'winston';
import { CreateTokenDTO } from './dto/create-token.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>) { }
  async create(createTokenDto: CreateTokenDTO) {
    const { token, user, expirationDate } = createTokenDto;
    const initialToken = new Token();
    initialToken.token = token;
    initialToken.user = user;
    initialToken.expirationDate = expirationDate;
    await this.tokenRepository.save(initialToken);
  }

  findAll() {
    return this.tokenRepository.find({ relations: ['user'], })
  }

  findOne(id: number) {
    const token = this.tokenRepository
      .findOne({ where: { id } })

    return token;
  }
  async findByUserId(userId: number) {
    const token = await this.tokenRepository.findOne({
      where: {
        user: {
          id: userId
        }
      }, relations: ['user']
    })
    return token

  }
  async findUserByToken(token: string) {
    const verificationToken = await this.tokenRepository.findOne({ where: { token }, relations: ['user'] });
    return verificationToken?.user;
  }

  async update(id: number, updateTokenDto: UpdateTokenDto) {
    const token = await this.findOne(id);

    if (!token) {
      throw new NotFoundException('Token not found');
    }
    if (updateTokenDto.token) {
      token.token = updateTokenDto.token;
    }
    if (updateTokenDto.expirationDate) {
      token.expirationDate = updateTokenDto.expirationDate;
    }


    // Similarly, update other properties as needed
    this.logger.info('Updated user successfully');
    return this.tokenRepository.save(token);
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
  generateVerificationToken(): string {
    const charset = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 6);
      otp += charset[randomIndex];
    }
    return otp;
  }
}
