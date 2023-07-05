import axiosClient from "../configs/axiosClient";
import { LoginUserDto } from "../interfaces";

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
