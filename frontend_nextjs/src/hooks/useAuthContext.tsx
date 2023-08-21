/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from 'react';
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
  const user = useSelector((state) => state.quizSession.user);
  const setCurrentUser = () => {
    async function getCurrentUser() {
      try {
        if (!user) {
          const response = await getMe();
          dispatch(setUser(response?.data));
        }
      } catch (error) {
        // Handle other errors that might occur during the fetch
        console.error('An error occurred:', error);
        dispatch(setUser(null));
        // You might want to set some state or display an error message to the user
      }
    }

    getCurrentUser();
  };

  const removeCurrentUser = () => {
    clearAuthentication();
    dispatch(setUser(null));
  };
  const isAuthenticated = () => {
    // Check if user is authenticated
    return !!user;
  };
  const authContextValue = {
    user,
    setCurrentUser,
    removeCurrentUser,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
