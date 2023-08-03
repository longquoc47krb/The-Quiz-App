/* eslint-disable import/no-extraneous-dependencies */
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${Cookies.get('accessToken') ?? ''}`,
  },
});

export default axiosClient;
