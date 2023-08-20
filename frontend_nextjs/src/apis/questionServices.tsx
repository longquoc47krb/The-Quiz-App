import axiosClient from '../configs/axiosClient';
import type { Question } from '../interfaces';

// const fetchQuestions = async () => {
//   const response = await axiosClient.get<Question[]>('/questions');
//   return response;
// };
export const fetchQuestionById = async (id: number) => {
  const response = await axiosClient.get<Question>(`/questions/${id}`);
  return response;
};
