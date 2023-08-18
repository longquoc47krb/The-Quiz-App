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
          if (response?.status === 500) {
            // Handle 500 Internal Server Error here
            console.error('Internal Server Error occurred');
            // You might want to set some state or display an error message to the user
            return;
          }

          dispatch(setUser(response));
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

  const authContextValue = {
    user,
    setCurrentUser,
    removeCurrentUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
