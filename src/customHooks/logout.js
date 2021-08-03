import { useDispatch } from "react-redux";
import { resetauthSlice } from "../container/loginContainer/authSlice";
import { resetPostSlice } from "../container/newsFeedContainer/newsFeedSlice";
import { resetNotificationSlice } from "../container/notificationContainer/notificationSlice";
import { setupAuthHeader } from "../utils/common";
import { logOutLocal, clearLastRoute } from "../localStorage";

export default function useLogout() {
  const dispatch = useDispatch();

  return function () {
    dispatch(resetauthSlice());
    dispatch(resetPostSlice());
    dispatch(resetNotificationSlice());
    setupAuthHeader();
    logOutLocal();
    clearLastRoute();
  };
}
