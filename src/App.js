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
        <Route path="/" element={<NewsFeedContainer />} />
        <Route path="/post/:postId" element={<PostContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/profile/:profileId" element={<ProfileContainer />} />
        <Route path="/notifications" element={<NotificationContainer />} />
        <Route path="/search/:searchText" element={<SearchContainer />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
