// rootReducer.js

import { combineReducers } from 'redux';

import quizSessionReducer from './quizSessionSlice';

const rootReducer = combineReducers({
  quizSession: quizSessionReducer,
  // other reducers...
});

export default rootReducer;
