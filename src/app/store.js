import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../container/loginContainer/userSlice";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
