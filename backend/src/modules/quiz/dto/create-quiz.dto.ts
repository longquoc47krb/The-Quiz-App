
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { QuizCategory } from "src/common/category.enum";
import { CreateQuestionDto } from "src/modules/question/dto/create-question.dto";

export class CreateQuizDto {
    @ApiProperty({ example: 'Quiz Title', description: 'The title of the quiz' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Quiz Description', description: 'The description of the quiz' })
    @IsString()
    description: string;

    @ApiProperty({ example: QuizCategory.SCIENCE, description: 'The category of the quiz' })
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        example: [
            {
                text: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Madrid'],
                correctOption: 'Paris',
                explain: 'Paris'
            },
            {
                text: 'Which planet is known as the Red Planet?',
                options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
                correctOption: 'Mars',
                explain: 'Mars'
            },
        ], description: 'The questions of the quiz'
    })
    @IsNotEmpty()
    @IsArray()
    questions: CreateQuestionDto[];

}
