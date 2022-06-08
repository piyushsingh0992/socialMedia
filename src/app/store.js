import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../container/loginContainer/authSlice";
import newsFeedReducer from "../container/newsFeedContainer/newsFeedSlice";
import notificationReducer from "../container/notificationContainer/notificationSlice";
import userReducer from "../container/profileContainer/userSlice";
import postReducer from "../container/postContainer/postSlice";
import suggestionReducer from "../container/newsFeedContainer/suggestionSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authSliceReducer,
    newsFeed: newsFeedReducer,
    notification: notificationReducer,
    post: postReducer,
    suggestion: suggestionReducer,
  },
});
