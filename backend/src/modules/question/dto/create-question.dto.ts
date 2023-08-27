import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    text: string;
    @IsNotEmpty()
    @IsArray()
    options: string[];
    @IsString()
    picture: string;
    @IsNotEmpty()
    @IsString()
    correctOption: string;
    @IsNotEmpty()
    @IsString()
    explain: string;
}
