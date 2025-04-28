import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import skillsService from "../services/skillsService";
import { toast } from "react-toastify";

export const getSkills = createAsyncThunk(
    "skills/getAll",
    async (_, thunkAPI) => {
        try {
            return await skillsService.getSkills();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createSkill = createAsyncThunk(
    "skills/create",
    async (skillData, thunkAPI) => {
        try {
            return await skillsService.createSkill(skillData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
) 

export const deleteSkill = createAsyncThunk(
    "skills/delete",
    async(id, thunkAPI) => {
        try {
            return await skillsService.deleteSkill(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateSkill = createAsyncThunk(
    "skills/update",
    async({id, updateData}, thunkAPI) => {
        try {
            return await  skillsService.updateSkill({id, updateData});
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const skillsSlice =  createSlice({
    name: 'skills',
    initialState: {
        skills: [],
        isError: false,
        isLoading: false,
        message: ''
    },
    extraReducers: (builder) => {
        builder

        // Get all skills
        .addCase(getSkills.pending, (state) => {
            state.isLoading =  true;
        })
        .addCase(getSkills.fulfilled, (state, action) => {
            state.isLoading = false;
            state.skills = action.payload;
        })
        .addCase(getSkills.rejected, (state, action) => {
            state.isLoading = false;
            state.isError =  true;
            state.message = action.payload.message;
            state.skills = null;
            toast.error(state.message)
        })

        // Create skill
        .addCase(createSkill.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createSkill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.skills.push(action.payload);
           toast.success("Skill created successfully")
        })
        .addCase(createSkill.rejected, (state, action) => {
            state.isLoading = false;
            state.isError =  true;
            state.message = action.payload?.message || "Failed to create a skill";
            toast.error(state.message)
        })

        // Delete skill
        .addCase(deleteSkill.pending, (state) => {
            state.isLoading =  true;
        })
        .addCase(deleteSkill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.skills = state.skills.filter((skill) => skill._id !== action.meta.arg);
            toast.success("Skill deleted successfuly");
        })
        .addCase(deleteSkill.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =  action.payload?.message || "Failde to delete project";
            toast.error(state.message)
        })

        // Update skill
        .addCase(updateSkill.pending, (state) => {
            state.isLoading  = true;
        })
        .addCase(updateSkill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.skills = state.skills.map((skill) =>
                skill._id === action.payload._id ? action.payload : skill
            )
            toast.success("Skill updated successfuly")
        })
        .addCase(updateSkill.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to update skill";
            toast.error(state.message)
        })
    }
})

export default skillsSlice.reducer;