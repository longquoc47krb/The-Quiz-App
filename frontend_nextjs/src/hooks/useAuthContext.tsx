/* eslint-disable react/jsx-no-constructed-context-values */
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMe } from '@/apis/userServices';
import { clearAuthentication } from '@/configs/axiosClient';
import { setUser } from '@/middlewares/slices/quizSessionSlice';

interface AuthContextType {
  user: any;
  setCurrentUser: () => void;
  removeCurrentUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    cacheTime: 0,
    keepPreviousData: false,
  });
  const user = useSelector((state) => state.quizSession.user);
  const setCurrentUser = () => {
    !isLoading && isLogged && dispatch(setUser(data?.data));
  };

  const removeCurrentUser = () => {
    clearAuthentication();
    router.push('/login');
    dispatch(setUser(null));
    setIsLogged(false);
  };
  const authContextValue = {
    user,
    setCurrentUser,
    removeCurrentUser,
    isLogged,
    setIsLogged,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
