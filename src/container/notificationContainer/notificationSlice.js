import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";

export const getNotififcations = createAsyncThunk(
  "notification/getNotififcations",

  async (dummy, { fulfillWithValue, rejectWithValue }) => {
    
    let response = await apiCall("GET", `notification`);
    
    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    status: "idle",
  },

  extraReducers: {
    [getNotififcations.pending]: (state) => {
      
      state.status = "loading";
    },
    [getNotififcations.fulfilled]: (state, action) => {
      
      state.notifications=action.payload.data.notification.notifications
      state.status = "fullfilled";
      
    },
    [getNotififcations.rejected]: (state, action) => {
      
      state.status = "rejected";
    },
  },
});

export default notificationSlice.reducer;