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
}

export interface HeaderProps {
  user: User;
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
