import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator';
import { QuizCategory } from 'src/common/category.enum';
import { CreateQuestionDto } from 'src/modules/question/dto/create-question.dto';
import { UpdateQuestionDto } from 'src/modules/question/dto/update-question.dto';
import { User } from 'src/modules/user/entities/user.entity';

export class UpdateQuizDto {
    @ApiProperty({ example: 'Updated Quiz Title', description: 'The updated title of the quiz' })
    @IsString()
    @IsNotEmpty()
    @IsOptional() // Marked as optional because it's an update
    title: string;

    @ApiProperty({ example: 'Updated Quiz Description', description: 'The updated description of the quiz' })
    @IsString()
    @IsOptional() // Marked as optional because it's an update
    description: string;

    @ApiProperty({ description: 'The updated category of the quiz' })
    @IsNotEmpty()
    @IsString()
    @IsOptional() // Marked as optional because it's an update
    category: string;

    @ApiProperty({
        example: [
            {
                text: 'Updated Question 1 Text',
                options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                correctOption: 'Option 1',
                explain: 'Explanation for Option 1'
            },
            // ... other updated questions
        ], description: 'The updated questions of the quiz'
    })
    @IsArray()
    @IsOptional() // Marked as optional because it's an update
    questions: UpdateQuestionDto[];

    @IsArray()
    @IsOptional()
    participants: User[];
}
