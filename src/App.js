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

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<NewsFeedContainer />} /> */}
        <Route path="/" element={<LoginContainer />} />
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
