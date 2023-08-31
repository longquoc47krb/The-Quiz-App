/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */

import axiosClient from "@/configs/axiosClient";
import { CreateQuizDto, Quiz, UpdateQuizDto } from "@/interfaces";

export const fetchQuizzes = async () => {
  const response = await axiosClient.get<Quiz[]>("/quiz");
  return response.data;
};
export const fetchQuizzesByAuthorId = async (id: string) => {
  try {
    const response = await axiosClient.get<Quiz[]>(`/quiz/author/${id}`);
    return response.data;

  } catch (error) {
    throw new Error('Not found')
  }
};
export const deleteQuizById = async (id: string) => {
  try {
    const response = await axiosClient.delete<Quiz[]>(`/quiz/${id}`);
    return response.data;

  } catch (error) {
    throw new Error('Not found')
  }
};
export const fetchQuizById = async (id: string) => {
  const response = await axiosClient.get<Quiz>(`/quiz/${id}`);
  return response;
};
export const createQuiz = async (payload: CreateQuizDto) => {
  const response = await axiosClient.post<CreateQuizDto>('/quiz', payload)
  return response;
}
export const updateQuiz = async (id: string, payload: UpdateQuizDto) => {
  try {
    const response = await axiosClient.patch<UpdateQuizDto>(`/quiz/${id}`, payload);
    return response;
  } catch (error) {
    // Handle the error here
    console.error('Error updating quiz:', error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};
export const updateParticipants = async (id: string, participantId: string) => {
  try {
    const response = await axiosClient.patch(`/quiz/participant/${id}`, null, { params: {
      participantId
    }});
    return response;
  } catch (error) {
    // Handle the error here
    console.error('Error updating quiz:', error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};