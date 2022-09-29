// Modules
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

// Icons
import { FaMeteor } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

// Types
import { userContextType } from "../types/user";

interface Props {
  aside: boolean;
  setAside: React.Dispatch<boolean>;
}

const Nav = ({ aside, setAside }: Props) => {
  const { user, setUser }: userContextType = useContext(UserContext);
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav inner">
          <div className="nav__left">
            <Link
              to={"/posts"}
              className="nav__img"
              onClick={() => {
                localStorage.setItem("lastLocation", "/dashboard");
              }}
            >
              <IconContext.Provider value={{ color: "#7d69ef" }}>
                <FaMeteor />
              </IconContext.Provider>
            </Link>
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <GiHamburgerMenu
                type="button"
                className="nav__btn"
                onClick={() => setAside(!aside)}
              />
            </IconContext.Provider>
          </div>
          <div className="nav__right">
            <div
              className="nav__right__user"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <IconContext.Provider value={{ color: "#7d69ef" }}>
                <FaUserAlt className="nav__right__user__img" />
              </IconContext.Provider>

              <span>Profile</span>
              <div
                className={dropdown ? "nav__dropdown active" : "nav__dropdown"}
              >
                <ul className="nav__dropdown__wrapper">
                  <li>
                    <h2>Username:</h2>
                    <p>{user.username}</p>
                  </li>
                  <li>
                    <h2>Access:</h2>
                    <p>{user.accessLevel}</p>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("userData");
                        setUser({ username: "", accessLevel: "" });
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
