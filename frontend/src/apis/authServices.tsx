import axiosClient from "../configs/axiosClient";
import { CreateUserDto, LoginUserDto } from "../interfaces";

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
export const register = async (createUser: CreateUserDto) => {
  try {
    const response = await axiosClient.post<CreateUserDto>(
      "/auth/register",
      createUser
    );
    return response;
  } catch (error) {
    return error;
  }
};
