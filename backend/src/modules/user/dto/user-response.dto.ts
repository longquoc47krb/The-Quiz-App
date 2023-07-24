
import { QuizSession } from "src/modules/quiz-session/entities/quiz-session.entity";
import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { User } from "../entities/user.entity";
import { LoginType, Role } from "src/configs/enum";

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
    quizSessions: QuizSession[];
    loginType: LoginType;
}
