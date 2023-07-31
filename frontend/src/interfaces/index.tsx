import { LazyExoticComponent } from "react";
import { Routes } from "../configs/routes";

export enum LoginType {
  Google = "GOOGLE",
  Facebook = "FACEBOOK",
  EmailPassword = "EMAIL_PASSWORD",
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  score: number;
  level: number;
  completedQuizzes: Quiz[];
  favoriteQuizzes: Quiz[];
  friends: User[];
  settings: string;
  createdAt: Date;
  lastLogin: Date;
  active: boolean;
  password: string;
  roles: string[];
  avatar: string;
  createdQuizzes: any;
}
export interface UserResponseDTO {
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
}
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: string;
  quizId: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  participants: User[];
  author: UserDto;
  totalParticipants: number;
  createdAt: Date;
}
export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string[];
  avatar: string;
}
export interface LoginUserDto {
  identifier: string;
  password: string;
}
export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  loginType: string;
  avatar: string;
  verified: boolean;
}

export interface HeaderProps {
  user: UserDto;
}
export interface QuizProps {
  id: number;
  name: string;
  questions: any;
  author: string;
  category: string;
}
export interface MenuItem {
  label: string;
  link: string;
}

export interface DropdownItem {
  label: string;
  onClick: () => void;
}

export interface MenuBarProps {
  profileItems: DropdownItem[];
}

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}
export interface QuizSession {
  id: number;
  user: User;
  quiz: Quiz;
  startTime: Date;
  endTime: Date;
}
export type TRoute = {
  path: Routes;
  element: LazyExoticComponent<() => JSX.Element>;
};
