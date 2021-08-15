import { useDispatch } from "react-redux";
import { resetauthSlice } from "../container/loginContainer/authSlice";
import { resetNewsFeedSlice } from "../container/newsFeedContainer/newsFeedSlice";
import { resetNotificationSlice } from "../container/notificationContainer/notificationSlice";
import { resetUserSlice } from "../container/profileContainer/userSlice";
import { resetPostSlice } from "../container/postContainer/postSlice";
import { setupAuthHeader } from "../utils/common";
import { logOutLocal, clearLastRoute } from "../localStorage";

export default function useLogout() {
  const dispatch = useDispatch();

  return function () {
    dispatch(resetauthSlice());
    dispatch(resetNewsFeedSlice());
    dispatch(resetNotificationSlice());
    dispatch(resetUserSlice());
    dispatch(resetPostSlice());
    setupAuthHeader();
    logOutLocal();
    clearLastRoute();
  };
}
