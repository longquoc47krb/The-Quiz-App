/* eslint-disable prettier/prettier */
import { UserRole } from 'src/configs/enum';
import { IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDTO {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'The email address of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    @Length(6, 20)
    password: string;

    @ApiProperty({ example: UserRole.USER, enum: UserRole, description: 'The role of the user' })
    @IsEnum(UserRole)
    role: UserRole;
}
