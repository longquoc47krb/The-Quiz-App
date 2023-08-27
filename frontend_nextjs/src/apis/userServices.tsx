/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import axiosClient from "@/configs/axiosClient";
import { User } from "@/interfaces";

export const fetchUsers = async () => {
  const response = await axiosClient.get<User[]>("/user");
  return response;
};
export const fetchUserById = async (id: string) => {
  const response = await axiosClient.get<User>(`/user/${id}`);
  return response.data;
};
export const getMe = async () => {
  try {
    const response = await axiosClient.get<User>(`/user/me`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error('An error occurred:', error);
    throw error; // Rethrow the error if needed
  }
};
