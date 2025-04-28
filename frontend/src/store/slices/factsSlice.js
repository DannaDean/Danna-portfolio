import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import factsService from "../services/factsService";
import { toast } from "react-toastify";

export const getFacts = createAsyncThunk(
    "facts/getAll",
    async (_, thunkAPI) => {
        try {
            return await factsService.getFacts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createFact =  createAsyncThunk(
    "facts/create",
    async (factData, thunkAPI) => {
        try {
            return await factsService.createFact(factData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteFact = createAsyncThunk(
    "facts/delete",
    async (id, thunkAPI) => {
        try {
            return await factsService.deleteFact(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateFact = createAsyncThunk(
    "facts/update",	
    async ({id, updateData}, thunkAPI) => {
        try {
            return await factsService.updateFact({id, updateData})
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
            
        }
    }

)

const factsSlice = createSlice({
    name: 'facts',
    initialState: {
        facts: [],
        isError: false,
        isLoading: false,
        message: ''
    },
    extraReducers: (builder) => {
        builder
        // Get all facts
        .addCase(getFacts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.facts = action.payload;
            state.isError = false;
        })
        .addCase(getFacts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        })

        // Create a fact
        .addCase(createFact.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createFact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.facts.push(action.payload);
            toast.success("Fact created successfully")
        })
        .addCase(createFact.rejected, (state, action) => {
            state.isLoading =  false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to create a fact";
            toast.error(state.message);
        })

        // Delete a fact
        .addCase(deleteFact.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteFact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.facts = state.facts.filter((fact) => fact._id !== action.meta.arg);
            toast.success("Fact deleted successfully")
        })
        .addCase(deleteFact.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to delete a fact";
            toast.error(state.message);
        })

        // Update a fact
        .addCase(updateFact.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateFact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.facts = state.facts.map((fact) => 
                fact._id === action.payload._id ? action.payload : fact
            )
            toast.success("Fact updated successfully")
        })
        .addCase(updateFact.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to update a fact";
            toast.error(state.message);
        })
    }
})

export default factsSlice.reducer;