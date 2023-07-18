
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsString, Length } from "class-validator";
import { AppRoles } from "src/app.roles";
import { EnumToString } from "src/common/helpers/enumToString";

export class CreateUserDto {
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

    @ApiProperty({ example: [AppRoles.USER], description: 'The roles of the user' })
    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid role value, ${EnumToString(AppRoles)}`,
    })
    roles: string[];
}
