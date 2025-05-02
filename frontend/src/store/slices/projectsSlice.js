import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectsService from '../services/projectsService';
import { toast } from 'react-toastify';

export const getProjects = createAsyncThunk(
    'GET_PROJECTS',
    async (_, thunkAPI) => {
        try {
            return await projectsService.getProjects();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    })

export const createProject = createAsyncThunk(
    "projects/create",
    async (projectData, thunkAPI) => {
        try {
            return await projectsService.createProject(projectData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteProject = createAsyncThunk(
    "projects/delete",
    async (id, thunkAPI) => {
        try {
            return await projectsService.deleteProject(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateProject = createAsyncThunk(
    "projects/update",
    async ({ id, updateData }, thunkAPI) => {
        try {
            return await projectsService.updateProject({ id, updateData });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteImage = createAsyncThunk(
    "projects/deleteImage",
    async ({ projectId, imageType }, thunkAPI) => {
        try {
            const response = await projectsService.deleteImage(projectId, imageType);
            return { projectId, imageType };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        isError: false,
        isLoading: false,
        message: ''
    },
    extraReducers: (builder) => {
        builder

            .addCase(getProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                state.projects = null
                toast.error(state.message);
            })

            // createProject
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects.push(action.payload);
                toast.success("Project created successfully");
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to create project";
                toast.error(state.message);
            })

            // delete Project
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = state.projects.filter((p) => p._id !== action.meta.arg);
                toast.success("Project deleted successfully");
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to delete project";
                toast.error(state.message);
            })

            // update Project
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = state.projects.map((project) =>
                    project._id === action.payload._id ? action.payload : project
                )
                toast.success("Project updated successfully");
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to update project";
                toast.error(state.message);
            })

            // Delete single image
            .addCase(deleteImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.isLoading = false;
                const { projectId, imageType } = action.payload;
                state.projects = state.projects.map((project) =>
                    project._id === projectId
                        ? { ...project, [imageType]: null }
                        : project
                );
                toast.success("Image deleted successfully");
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to delete image";
                toast.error(state.message);
            });
    }
})

export default projectsSlice.reducer;