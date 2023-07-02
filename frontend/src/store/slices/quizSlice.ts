import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Quiz } from '../../interfaces';

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [],
    quiz: {}
}

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuiz: (state, action: PayloadAction<{ quiz: Quiz }>) => {
            state.quiz = action.payload.quiz;
        },
        setCurrentQuestionIndex: (state, action: PayloadAction<{ index: number }>) => {
            state.currentQuestionIndex = action.payload.index;
        },
        setScore: (state, action: PayloadAction<{ score: number }>) => {
            state.score = action.payload.score;
        },
        setUserAnswers: (state, action: PayloadAction<{ answers: never[] }>) => {
            state.userAnswers = action.payload.answers;
        },
        setQuestions: (state, action: PayloadAction<{ questions: never[] }>) => {
            state.questions = action.payload.questions;
        }
    }
});

export const { setQuiz, setCurrentQuestionIndex, setScore, setUserAnswers, setQuestions } = quizSlice.actions
export const quizSelector = (state: any) => state.quiz.quiz;
export const scoreSelector = (state: any) => state.quiz.score;
export const currentQuestionIndexSelector = (state: any) => state.quiz.currentQuestionIndex;
export const questionsSelector = (state: any) => state.quiz.questions;
export const userAnswers = (state: any) => state.quiz.userAnswers;

export default quizSlice.reducer