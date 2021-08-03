import React, { useEffect } from "react";
import "./app.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginContainer from "./container/loginContainer";
import NewsFeedContainer from "./container/newsFeedContainer";
import PostContainer from "./container/postContainer";
import ProfileContainer from "./container/profileContainer";
import Error404Page from "./container/error404Container";
import NotificationContainer from "./container/notificationContainer";
import SearchContainer from "./container/searchContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signInfromLocalStorage } from "./container/loginContainer/userSlice";
import PrivateRoute from "./components/privateRoute";
import { setupAuthHeader, setupAuthExceptionHandler } from "./utils/common.js";
import useLogout from "./customHooks/logout";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const logout = useLogout();

  useEffect(() => {
    if (userDetails) {
      setupAuthHeader(userDetails.token);
      dispatch(signInfromLocalStorage(userDetails));
      setupAuthExceptionHandler(logout, navigate);
    }
  }, [userDetails]);

  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <PrivateRoute path="/" element={<NewsFeedContainer />} />
        <PrivateRoute path="/post/:postId" element={<PostContainer />} />

        <PrivateRoute path="/profile/:userId" element={<ProfileContainer />} />
        <PrivateRoute
          path="/notifications"
          element={<NotificationContainer />}
        />
        <PrivateRoute path="/search" element={<SearchContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
