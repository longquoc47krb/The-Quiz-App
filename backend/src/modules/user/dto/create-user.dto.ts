
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsString, Length } from "class-validator";
import { AppRoles } from "src/app.roles";
import { EnumToString } from "src/common/helpers/enumToString";
import { DEFAULT_USER_AVATAR } from "src/configs/constants";
import { LoginType } from "src/configs/enum";

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
    @ApiProperty({ example: [LoginType.EmailPassword], description: 'The login type of the user' })
    @IsArray()
    @IsEnum(LoginType, {
        each: true,
        message: `must be a valid login type value, ${EnumToString(LoginType)}`,
    })
    loginType: LoginType;
    @ApiProperty({ example: DEFAULT_USER_AVATAR, description: 'The avatar of the user' })
    @IsString()
    avatar: string;
}
