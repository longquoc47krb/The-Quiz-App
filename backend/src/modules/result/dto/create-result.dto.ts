import { ApiProperty } from "@nestjs/swagger";
import { Answer } from "../entities/result.entity";
import { CreateAnswerDto } from "./create-answer.dto";
import { IsArray, IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateResultDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    player_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quiz_id: number;

    @ApiProperty({ type: CreateAnswerDto })
    @IsNotEmpty()
    @IsArray()
    result: CreateAnswerDto[];

    @ApiProperty()
    @IsNotEmpty()
    startTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    endTime: Date;
}