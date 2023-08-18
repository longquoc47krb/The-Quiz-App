import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty()
    yourChoice: string;

    @ApiProperty()
    answer: string;

    @ApiProperty()
    correct: boolean;

    @ApiProperty()
    options: string[];
}