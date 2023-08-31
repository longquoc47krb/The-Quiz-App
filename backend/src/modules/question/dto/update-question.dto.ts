import { IsNotEmpty, IsArray, IsString, IsNumber } from 'class-validator';

export class UpdateQuestionDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
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
