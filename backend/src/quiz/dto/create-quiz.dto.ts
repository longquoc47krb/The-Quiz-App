/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { QuizCategory } from "src/common/category.enum";
import { Question } from "src/question/entities/question.entity";

export class CreateQuizDto {
    @ApiProperty({ example: 'Quiz Title', description: 'The title of the quiz' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Quiz Description', description: 'The description of the quiz' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: QuizCategory.SCIENCE, description: 'The category of the quiz' })
    @IsNotEmpty()
    category: QuizCategory;

    @ApiProperty({
        example: [
            {
                text: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Madrid'],
                correctOption: 'Paris'
            },
            {
                text: 'Which planet is known as the Red Planet?',
                options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
                correctOption: 'Mars'
            },
        ], description: 'The questions of the quiz'
    })
    @IsNotEmpty()
    @IsArray()
    questions: Question[];
}
