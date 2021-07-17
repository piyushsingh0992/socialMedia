import "./app.css";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/loginScreen";
import NewsFeedScreen from "./screens/newsFeedScreen";
import PostScreen from "./screens/postScreen";
import ProfileScreen from "./screens/profileScreen";
import Error404Page from "./screens/error404Screen";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<NewsFeedScreen />} />
        <Route path="/post/:postId" element={<PostScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile/:profileId" element={<ProfileScreen />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
