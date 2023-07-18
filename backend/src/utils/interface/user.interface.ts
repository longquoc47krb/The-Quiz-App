export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: string[];
    dateOfBirth: Date;
    score: number;
    level: string;
    completedQuizzes: number;
    favoriteQuizzes: string[];
    friends: string[];
    createdAt: Date;
    lastLogin: Date;
    active: boolean;
    avatar: string;
    createdQuizzes: number;
    quizSessions: number;
    password: string;
    hashPassword: () => void;
    validatePassword: (password: string) => boolean;
}
