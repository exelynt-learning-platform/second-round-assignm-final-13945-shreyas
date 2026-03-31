import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToAPI } from "../services/openaiService";

// Async thunk
export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (message, { rejectWithValue }) => {
    try {
      const response = await sendMessageToAPI(message);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ role: "user", content: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ role: "assistant", content: action.payload });
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;