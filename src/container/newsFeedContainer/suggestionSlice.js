import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../apiCall";
import { current } from "immer";

export let getSuggestions = createAsyncThunk(
  "suggestion/getSuggestions",
  async (dummy, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", "suggestion");

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const postSlice = createSlice({
  name: "suggestion",
  initialState: {
    suggestions: [],
    status: "idle",
    message: "",
  },
  reducers: {resetSuggestionSlice:(state)=>{
      return {
        suggestions: [],
        status: "idle",
        message: "",
      }
  }},
  extraReducers: {
    [getSuggestions.pending]: (state) => {
      state.status = "loading";
    },
    [getSuggestions.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.suggestions = action.payload.data.suggestions;
      state.message = action.payload.data.message;
    },
    [getSuggestions.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const {resetSuggestionSlice} = postSlice.actions;

export default postSlice.reducer;
