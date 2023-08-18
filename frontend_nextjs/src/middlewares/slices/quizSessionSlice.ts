// quizSessionSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const quizSessionSlice = createSlice({
  name: 'quizSession',
  initialState: {
    id: null,
    user: null,
    quiz: null,
    startTime: null,
    endTime: null,
    isStart: false,
    currentQuestion: 0,
  },
  reducers: {
    setQuizSession: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    isStart: (state, action) => {
      return {
        ...state,
        isStart: action.payload,
      };
    },
    setCurrentQuestion: (state, action) => {
      return {
        ...state,
        currentQuestion: action.payload,
      };
    },
    setStartTime: (state, action) => {
      return {
        ...state,
        startTime: action.payload,
      };
    },
    setEndTime: (state, action) => {
      return {
        ...state,
        endTime: action.payload,
      };
    },
  },
});
const persistConfig = {
  key: 'quizSession',
  storage,
  // You can add more configuration options here if needed
};
const persistedReducer = persistReducer(
  persistConfig,
  quizSessionSlice.reducer,
);

export const {
  setQuizSession,
  isStart,
  setCurrentQuestion,
  setStartTime,
  setEndTime,
  setUser,
} = quizSessionSlice.actions;
export default persistedReducer;
