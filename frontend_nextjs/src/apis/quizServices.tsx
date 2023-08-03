/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */

import axiosClient from "@/configs/axiosClient";
import { Quiz } from "@/interfaces";

export const fetchQuizzes = async () => {
  const response = await axiosClient.get<Quiz[]>("/quiz");
  return response.data;
};
export const fetchQuizById = async (id: string) => {
  const response = await axiosClient.get<Quiz>(`/quiz/${id}`);
  return response;
};
