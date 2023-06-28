import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";
import { Question } from "../interfaces";

const fetchQuestions = async () => {
  const response = await axiosClient.get<Question[]>("/questions");
  return response;
};
export const fetchQuestionById = async (id: number) => {
  const response = await axiosClient.get<Question>(`/questions/${id}`);
  return response;
};
export const useFetchQuestions = () => {
  return useQuery(["fetchQuestions"], fetchQuestions, {
    staleTime: 0,
  });
};
