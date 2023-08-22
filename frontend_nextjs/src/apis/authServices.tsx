/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */

import axiosClient from "@/configs/axiosClient";
import { CreateUserDto, LoginUserDto, RefreshTokenDto } from "@/interfaces";

export const login = async (loginDto: LoginUserDto) => {
  try {
    const response = await axiosClient.post<LoginUserDto>(
      "/auth/login",
      loginDto
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const registerUser = async (createUser: CreateUserDto) => {
  try {
    const response = await axiosClient.post<CreateUserDto>(
      "/auth/register",
      createUser
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const sendResetPassword = async (email: string) => {
  try {
    const response = await axiosClient.post("/auth/send-token-email", null, { params: {
      email,
      type: "RESET_PASSWORD"
    }});
    return response.data;
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (code: string) => {
  try {
    const response = await axiosClient.post("/auth/reset-password", null, { params: {
      code
    }});
    return response.data;
  } catch (error) {
    return error;
  }
};
export const refreshAuthToken = async (token: RefreshTokenDto) => {
  try {
    const response = await axiosClient.post("/auth/refresh-token", token);
    return response.data;
  } catch (error) {
    return error;
  }
};
