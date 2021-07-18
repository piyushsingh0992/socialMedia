import "./app.css";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/loginScreen";
import NewsFeedScreen from "./screens/newsFeedScreen";
import PostScreen from "./screens/postScreen";
import ProfileScreen from "./screens/profileScreen";
import Error404Page from "./screens/error404Screen";
import NotificationScreen from "./screens/notificationScreen";
import SearchScreen from "./screens/searchScreen";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<NewsFeedScreen />} /> */}
        <Route path="/" element={<SearchScreen />} />
        <Route path="/post/:postId" element={<PostScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile/:profileId" element={<ProfileScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
        <Route path="/search/:searchText" element={<SearchScreen />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
