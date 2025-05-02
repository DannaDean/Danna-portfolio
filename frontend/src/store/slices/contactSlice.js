import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "../services/contactService";
import { toast } from "react-toastify";

export const sentMessage = createAsyncThunk(
    "contact/sentMessage",
    async (messageData, thunkAPI) => {
        try {
            return await contactService.sentMessage(messageData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getMessages = createAsyncThunk(
    "contact/getMessages",
    async (_, thunkAPI) => {
        try {
            return await contactService.getMessages();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteMessage = createAsyncThunk(
    "contact/deleteMessage",
    async (id, thunkAPI) => {
        try {
            return await contactService.deleteMessage(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        messages: [],
        isError: false,
        isLoading: false,
        message: "",
    },
    extraReducers: (builder) => {
        builder

        // sentMessage
        .addCase(sentMessage.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sentMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload.message;
            toast.success("Form successfuly sent");
        })
        .addCase(sentMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        })

        // getMessages
        .addCase(getMessages.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload;
            state.isError = false;
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        })

        // deleteMessage
        .addCase(deleteMessage.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = state.messages.filter(
                (message) => message._id !== action.meta.arg
            );
            state.isError = false;
            toast.success("Message deleted successfully");
        })
        .addCase(deleteMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        });
    }
})

export default contactSlice.reducer;