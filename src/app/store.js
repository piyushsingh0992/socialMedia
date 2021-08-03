import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../container/loginContainer/authSlice";
import postReducer from "../container/newsFeedContainer/postSlice";
import notificationReducer from "../container/notificationContainer/notificationSlice";
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    post:postReducer,
    notification:notificationReducer,
  },
});
