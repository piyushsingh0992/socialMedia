import React, { useEffect } from "react";

import "./app.css";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./container/loginContainer";
import NewsFeedContainer from "./container/newsFeedContainer";
import PostContainer from "./container/postContainer";
import ProfileContainer from "./container/profileContainer";
import Error404Page from "./container/error404Container";
import NotificationContainer from "./container/notificationContainer";
import SearchContainer from "./container/searchContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import { signInfromLocalStorage } from "./container/loginContainer/userSlice";
import PrivateRoute from "./components/privateRoute";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      dispatch(signInfromLocalStorage(userDetails));
    }
  }, []);

  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <PrivateRoute path="/" element={<NewsFeedContainer />} />
        <PrivateRoute path="/post/:postId" element={<PostContainer />} />

        <PrivateRoute
          path="/profile/:profileId"
          element={<ProfileContainer />}
        />
        <PrivateRoute
          path="/notifications"
          element={<NotificationContainer />}
        />
        <PrivateRoute
          path="/search/:searchText"
          element={<SearchContainer />}
        />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
