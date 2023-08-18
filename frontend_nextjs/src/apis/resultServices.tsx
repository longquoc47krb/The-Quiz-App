/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */

import axiosClient from "@/configs/axiosClient";
import { CreateResultDto, Result } from "@/interfaces";

export const fetchResults = async () => {
  const response = await axiosClient.get<Result[]>("/result");
  return response.data;
};
export const fetchResultById = async (id: string) => {
  const response = await axiosClient.get<Result>(`/result/${id}`);
  return response.data;
};
export const fetchResultsByPlayerId = async (id: string) => {
  const response = await axiosClient.get<Result>(`/result/player/${id}`);
  return response.data;
};
export const createResult = async (payload: CreateResultDto) => {
  const response = await axiosClient.post<CreateResultDto>('/result', payload)
  return response;
}