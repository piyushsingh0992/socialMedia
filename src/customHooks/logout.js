import { useDispatch } from "react-redux";
import { resetUserSlice } from "../container/loginContainer/userSlice";
import { resetPostSlice } from "../container/newsFeedContainer/postSlice";
import { resetNotificationSlice } from "../container/notificationContainer/notificationSlice";
import { setupAuthHeader } from "../utils/common";
import { logOutLocal, clearLastRoute } from "../localStorage";

export default function useLogout() {
  const dispatch = useDispatch();

  return function () {
    dispatch(resetUserSlice());
    dispatch(resetPostSlice());
    dispatch(resetNotificationSlice());
    setupAuthHeader();
    logOutLocal();
    clearLastRoute();
  };
}
