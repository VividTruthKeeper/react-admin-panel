// Modules
import { useMemo, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { PostContext } from "./context/PostContext";

// Style
import "./assets/styles/style.scss";

// Types
import { PostType } from "./types/posts";

// Pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Details from "./pages/Details";
import Post from "./pages/Post";
import Category from "./pages/Category";

const App = () => {
  const navigate = useNavigate();
  const date = new Date("0.0.0000");
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: -1,
      category: "",
      title: "",
      link: "",
      publish_date: date,
      summary: "",
      createdAt: date,
      updatedAt: date,
    },
  ]);

  const [user, setUser] = useState({
    username: "",
    accessLevel: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const postValue = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    } else {
      navigate(localStorage.getItem("lastLocation") || "/dashboard");
    }
  }, [user]);

  return (
    <PostContext.Provider value={postValue}>
      <UserContext.Provider value={userValue}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Main child={<Dashboard />} />} />
            <Route path="/posts" element={<Main child={<Posts />} />} />
            <Route path="/category" element={<Main child={<Category />} />} />
            <Route path="/posts/:id" element={<Main child={<Post />} />} />
            <Route
              path="/user_details"
              element={<Main child={<Details />} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </PostContext.Provider>
  );
};

export default App;
