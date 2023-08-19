import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty()
    yourChoice: string;

    @ApiProperty()
    answer: string;

    @ApiProperty()
    correct: boolean;

    @ApiProperty()
    time: number;

    @ApiProperty()
    options: string[];

    @ApiProperty()
    title: string;

    @ApiProperty()
    explain: string;
}