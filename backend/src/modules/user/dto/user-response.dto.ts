import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { User } from "../entities/user.entity";
import { LoginType, Role } from "src/configs/enum";
import { Token } from "src/modules/token/entities/token.entity";

export class UserResponseDTO {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: Role[];
    dateOfBirth: Date;
    score: number;
    level: number;
    completedQuizzes: Quiz[];
    favoriteQuizzes: Quiz[];
    friends: User[];
    createdAt: Date;
    lastLogin: Date;
    active: boolean;
    avatar: string;
    createdQuizzes: any;
    loginType: LoginType;
    token: Token;
}
