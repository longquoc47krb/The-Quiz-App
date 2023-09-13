// rootReducer.js

import { combineReducers } from 'redux';

import createQuizReducer from './createQuizSlice';
import quizSessionReducer from './quizSessionSlice';

const rootReducer = combineReducers({
  quizSession: quizSessionReducer,
  createQuiz: createQuizReducer,
  // other reducers...
});

export default rootReducer;
