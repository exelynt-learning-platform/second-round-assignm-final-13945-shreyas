import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToAPI } from "../services/openaiService";

// ✅ Async thunk with conversation history
export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { messages } = getState().chat;

      // Get last user message
      const lastMessage = messages[messages.length - 1];

      const response = await sendMessageToAPI(
        lastMessage.content,
        messages // ✅ pass full history
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Helper to generate unique ID
const generateId = () => Date.now() + Math.random();

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Add user message
    addUserMessage: (state, action) => {
      state.messages.push({
        id: generateId(),
        role: "user",
        content: action.payload,
      });

      state.error = null; // ✅ clear old errors
    },

    // (Optional) Clear chat
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Loading state
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        state.error = null; // ✅ clear error
      })

      // ✅ Success response
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          id: generateId(),
          role: "assistant",
          content: action.payload,
        });
      })

      // ✅ Error handling
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "API Error";
      });
  },
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;