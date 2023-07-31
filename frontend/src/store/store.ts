import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './slices/quizSlice';
import authReducer from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

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
export const store = configureStore({
    reducer: {
        quiz: quizPersistedReducer,
        auth: authPersistedReducer,
    },
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);