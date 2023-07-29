import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './slices/quizSlice';
import authReducer from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";

const quizPersistConfig = {
    key: "quiz",
    version: 1,
    storage,
};
const authPersistConfig = {
    key: "auth",
    version: 1,
    storage,
};
const quizPersistedReducer = persistReducer(
    quizPersistConfig,
    quizReducer
);
const authPersistedReducer = persistReducer(
    authPersistConfig,
    authReducer
);
const store = configureStore({
    reducer: {
        quiz: quizPersistedReducer,
        auth: authPersistedReducer,
    },
});
export default store;