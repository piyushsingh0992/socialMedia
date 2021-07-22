import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../container/loginContainer/userSlice";
import postReducer from "../container/newsFeedContainer/postSlice";
import notificationReducer from "../container/notificationContainer/notificationSlice";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    post:postReducer,
    notification:notificationReducer,
  },
});
