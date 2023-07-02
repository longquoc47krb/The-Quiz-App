/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserDto } from "src/user/dto/user-hidden-password.dto";
import { User } from "src/user/entities/user.entity";

export function mapUserToDTO(user: User): UserDto {
    const { password, ...userData } = user;
    return userData;
}