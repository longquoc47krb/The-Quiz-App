// yourReducer.js
import { createSlice } from '@reduxjs/toolkit';

const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState: {
    isFocused: false,
  },
  reducers: {
    // Define your actions and reducers here
    onFocused: (state) => {
      state.isFocused = true;
    },
    onBlurred: (state) => {
      state.isFocused = false;
    },
  },
});

export const { onFocused, onBlurred } = createQuizSlice.actions;
export default createQuizSlice.reducer;
