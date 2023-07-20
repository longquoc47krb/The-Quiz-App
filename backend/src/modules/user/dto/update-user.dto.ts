import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'The name of the user.',
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email address of the user.',
        example: 'johndoe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The date of birth of the user. Use ISO 8601 format (YYYY-MM-DD).',
        nullable: true,
        example: '1990-01-01',
    })
    @IsDateString()
    @IsOptional()
    dateOfBirth: string;

    @ApiProperty({
        description: "The URL of the user's avatar image.",
        example: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    })
    @IsString()
    avatar: string;
}
