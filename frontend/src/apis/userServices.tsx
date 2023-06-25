import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";
import { User } from "../interfaces";

const fetchUsers = async () => {
  const response = await axiosClient.get<User[]>("/users");
  return response;
};

export const useFetchUsers = () => {
  return useQuery(["fetchUsers"], fetchUsers, {
    staleTime: 0,
  });
};
