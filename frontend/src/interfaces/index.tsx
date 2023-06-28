export interface User {
  name: string;
  avatar: string;
  email: string;
}
export interface Question {
  id: number;
  content: string;
  options: string[];
  correctOption: number;
}

export interface Quiz {
  id: number;
  name: string;
  questions: number[];
}
export interface HeaderProps {
  user: User;
}
export interface TestProps {
  id: number;
  name: string;
  questions: number[];
  author: string;
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
