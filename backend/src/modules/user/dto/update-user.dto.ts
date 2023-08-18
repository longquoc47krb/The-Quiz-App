// update-user.dto.ts
import { IsEmail, IsOptional, IsString, IsDate, IsInt, Min, IsBoolean, IsArray } from 'class-validator';
import { LoginType, Role } from 'src/configs/enum';

import { User } from '../entities/user.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Token } from 'src/modules/token/entities/token.entity';
export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @IsOptional()
    @IsInt()
    @Min(0)
    score?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    level?: number;

    @IsOptional()
    @IsArray()
    completedQuizzes?: Quiz[];

    @IsOptional()
    @IsArray()
    favoriteQuizzes?: Quiz[];

    @IsOptional()
    @IsArray()
    friends?: User[];

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    lastLogin?: Date;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsArray()
    roles?: Role[];

    @IsOptional()
    @IsString()
    avatar?: string;

    @IsOptional()
    @IsArray()
    createdQuizzes?: any[]; // Replace 'any' with the appropriate type

    @IsOptional()
    @IsString()
    loginType?: LoginType;

    @IsOptional()
    @IsBoolean()
    verified?: boolean;

    @IsOptional()
    token?: Token;
}
