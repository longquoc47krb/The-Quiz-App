/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { QuizCategory } from "src/common/category.enum";
import { Question } from "src/question/question.entity";
import { User } from "src/user/user.entity";

/* eslint-disable prettier/prettier */
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

    @ApiProperty({ type: User, description: 'The author of the quiz' })
    @ValidateNested()
    @Type(() => User)
    author: User;

    @ApiProperty({ type: [Question], description: 'The questions of the quiz' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Question)
    questions: Question[];
}
