// Modules
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Components
import Nav from "../components/Nav";
import Aside from "../components/Aside";

// Types
import { userContextType } from "../types/user";

const Main = ({ child }: any) => {
  const navigate = useNavigate();
  const { user, setUser }: userContextType = useContext(UserContext);
  const [aside, setAside] = useState(true);

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main className="main">
      <div className="main__top">
        <Nav aside={aside} setAside={setAside} />
      </div>
      <div className="main__mid">
        <Aside aside={aside} setAside={setAside} />
        <div className="main-inner">{child}</div>
      </div>
    </main>
  );
};

export default Main;
