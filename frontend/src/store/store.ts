import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './slices/quizSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";

const quizPersistConfig = {
    key: "quiz",
    version: 1,
    storage,
};
const quizPersistedReducer = persistReducer(
    quizPersistConfig,
    quizReducer
);
const store = configureStore({
    reducer: {
        quiz: quizPersistedReducer,
    },
});
export default store;