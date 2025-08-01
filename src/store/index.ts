import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import candidateReducer from './slices/candidateSlice';
import cvReducer from './slices/cvSlice';
import jobReducer from './slices/jobSlice';
import userReducer from './slices/userSlice';
import matchReducer from './slices/matchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidateReducer,
    cv: cvReducer,
    jobs: jobReducer,
    users: userReducer,
    match: matchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
