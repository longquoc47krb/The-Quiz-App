/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>) { }
  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
