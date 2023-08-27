import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsArray()
    options: string[];

    @IsNotEmpty()
    @IsString()
    correctOption: string;

    @IsNotEmpty()
    @IsString()
    explain: string;
}
