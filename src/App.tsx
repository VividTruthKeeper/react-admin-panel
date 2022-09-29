// Modules
import { useMemo, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { PostContext } from "./context/PostContext";

// Style
import "./assets/styles/style.scss";

// Types
import { PostType } from "./types/posts";
import { SourceType } from "./types/sources";
import { PopupType } from "./types/popup";

// Components
import Popup from "./components/Popup";

// Pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Source from "./pages/Source";
import EditSource from "./pages/EditSource";
import CreateSource from "./pages/CreateSource";

// Helpers
import { getLinks } from "./helpers/apiRequests";

const App = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>();
  const [popup, setPopup] = useState<PopupType>({
    success: false,
    pop: false,
    message: {
      success: "Success",
      failure: "Failure",
    },
  });

  const [sources, setSources] = useState<SourceType[]>();

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
  const popupValue = useMemo(() => ({ popup, setPopup }), [popup, setPopup]);
  const sourceValue = useMemo(
    () => ({ sources, setSources }),
    [sources, setSources]
  );

  useEffect(() => {
    if (!user.username) {
      // localStorage.removeItem("lastLocation");
      navigate("/login");
    } else {
      navigate(localStorage.getItem("lastLocation") || "/posts");
    }
  }, [user]);

  useEffect(() => {
    getLinks(setSources);
  }, []);

  return (
    <PostContext.Provider value={{ postValue, sourceValue, popupValue }}>
      <UserContext.Provider value={userValue}>
        <div className="App">
          <Popup />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/posts" element={<Main child={<Posts />} />} />
            <Route path="/source" element={<Main child={<Source />} />} />
            <Route
              path="/source/edit/:id"
              element={<Main child={<EditSource />} />}
            />
            <Route path="/posts/:id" element={<Main child={<Post />} />} />
            <Route
              path="/source/create"
              element={<Main child={<CreateSource />} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </PostContext.Provider>
  );
};

export default App;
