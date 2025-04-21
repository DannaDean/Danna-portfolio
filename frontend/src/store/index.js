import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './slices/projectsSlice';
import authSlice from './slices/authSlice';

export const store = configureStore(({
    reducer: {
        projects: projectsSlice,
        auth: authSlice,
    }
}))