// Modules
import { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";

// Style
import "./assets/styles/style.scss";

// Pages
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

const App = () => {
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

  return (
    <UserContext.Provider value={userValue}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Main child={<Dashboard />} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
