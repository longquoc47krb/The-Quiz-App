import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";
import { Quiz } from "../interfaces";

const fetchQuizzes = async () => {
  const response = await axiosClient.get<Quiz[]>("/quiz");
  return response;
};

export const useFetchQuizzes = () => {
  return useQuery(["fetchQuizzes"], fetchQuizzes, {
    staleTime: 0,
  });
};
export const fetchQuizById = async (id: string) => {
  const response = await axiosClient.get<Quiz>(`/quiz/${id}`);
  return response;
};
