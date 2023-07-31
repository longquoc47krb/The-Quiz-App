import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDTO } from './create-token.dto';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTokenDto {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsDateString()
    expirationDate: Date;
}
