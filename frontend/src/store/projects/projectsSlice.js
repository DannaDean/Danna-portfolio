import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectsService from '../services/projectsService';

export const getProjects = createAsyncThunk('GET_PROJECTS', async (_, thunkAPI) => {
    try {
        return await projectsService.getProjects();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: null,
        isError: false,
        isLoading: false,
        message: ''
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.projects = action.payload
        });
        builder.addCase(getProjects.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            state.projects = null
        });
    }
})

export default projectsSlice.reducer;