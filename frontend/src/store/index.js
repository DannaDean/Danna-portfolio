import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './projects/projectsSlice';

export const store = configureStore(({
    reducer: {
        projects: projectsSlice
    }
}))