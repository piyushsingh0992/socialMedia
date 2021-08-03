import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",

  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `user/${userId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: [],
    status: "idle",
  },

  reducers: {
    populatingUserDetails: (state, action) => {
      return {
        userDetails: action.payload.userDetails,
        status: "fullfilled",
      };
    },

    cleartUserDetails: (state) => {
      return {
        userDetails: [],
        status: "idle",
      };
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.status = "loading";
    },
    [getUserDetails.fulfilled]: (state, action) => {
     
      state.userDetails = action.payload.data.userDetails;
      state.status = "fullfilled";
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { resetUserSlice } = userSlice.actions;

export default userSlice.reducer;
