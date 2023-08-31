export enum LoginType {
  Google = 'GOOGLE',
  Facebook = 'FACEBOOK',
  EmailPassword = 'EMAIL_PASSWORD',
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
export interface MCQProps {
  title: string;
  picture: string;
  options: string[];
  explain: string;
  yourChoice: string;
  answer: string;
}
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: string;
  quizId: number;
  explain: string;
  picture: string;
}

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  category: string;
  questions: Question[];
  participants?: User[];
  author: User;
  totalParticipants?: number;
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
  user: User;
}
export interface QuizProps {
  id: number;
  title: string;
  questions: any;
  author: User;
  category: string;
  isUpdate?: boolean;
  participants?: User[];
  totalParticipants?: number;
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
  User = 'USER',
  Admin = 'ADMIN',
}
export interface QuizSession {
  id: number;
  user: User;
  quiz: Quiz;
  startTime: Date;
  endTime: Date;
}
export enum QuizCategory {
  SPORTS = 'Sports',
  SCIENCE = 'Science and Technology',
  HISTORY = 'History',
  ARTS = 'Art and Artists',
  GENERAL = 'General Knowledge',
  MOVIES = 'Movies and TV Shows',
}
export interface DecodedUser {
  userId: number;
  name: string;
  roles: string[];
}
interface CreateQuestionDto {
  text: string;
  options: string[];
  correctOption: string;
  explain: string;
}
interface CreateAnswerDto {
  yourChoice: string;
  answer: string;
  correct: boolean;
  time: number;
  options: string[];
  picture?: string;
}
export interface CreateResultDto {
  player_id: number;
  quiz_id: number;
  result: CreateAnswerDto[];
  startTime: Date;
  endTime: Date;
}
export interface Result {
  id: number;
  player_id: number;
  player: User;
  quiz_id: number;
  quiz: Quiz;
  result: Answer[];
  startTime: Date;
  endTime: Date;
  score: number;
}
interface Answer {
  id: number;
  yourChoice: string;
  answer: string;
  correct: boolean;
  time: number;
  result_id: number;
  result: Result;
  options: string[];
  picture: string;
}
export interface UpdateQuestionDto {
  id: number;
  text?: string;
  options?: string[];
  correctOption?: string;
  explain?: string;
  picture?: string;
}

export interface UpdateQuizDto {
  title?: string;

  description?: string;

  category?: string;

  questions?: UpdateQuestionDto[];
}
// Define the interface for the CreateQuizDto
export interface CreateQuizDto {
  title: string;
  description: string;
  category: string; // Assuming QuizCategory is a string enum or type
  questions: CreateQuestionDto[];
}
export interface RefreshTokenDto {
  refreshToken: string;
}
