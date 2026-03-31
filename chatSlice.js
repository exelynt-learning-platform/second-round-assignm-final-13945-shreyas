import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToAPI } from "../services/openaiService";

const generateId = () => Date.now() + Math.random();

// ✅ Accept message from InputBox
export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (message, { getState, rejectWithValue }) => {
    try {
      const { messages } = getState().chat;

      const response = await sendMessageToAPI(
        message,
        messages // ✅ pass history
      );

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
      state.messages.push({
        id: generateId(),
        role: "user",
        content: action.payload,
      });
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: generateId(),
          role: "assistant",
          content: action.payload,
        });
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;