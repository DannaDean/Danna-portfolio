import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import projectsSlice from './slices/projectsSlice';
import skillsSlice from './slices/skillsSlice';
import factsSlice from './slices/factsSlice';
import contactSlice from './slices/contactSlice';

export const store = configureStore(({
    reducer: {
        auth: authSlice,
        projects: projectsSlice,
        skills: skillsSlice,
        facts: factsSlice,
        contact: contactSlice,
    }
}))