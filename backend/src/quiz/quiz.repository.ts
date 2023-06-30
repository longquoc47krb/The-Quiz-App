/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { Quiz } from "./quiz.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";


@Injectable()
export class QuizRepository extends Repository<Quiz> {

}