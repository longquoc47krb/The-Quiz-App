
import { Role } from 'src/configs/enum';
import { IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
    @ApiProperty({ example: 'nivef98842@sportrid.com', description: 'The username of the user' })
    @IsString()
    identifier?: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    @Length(6, 20)
    password: string;
}
