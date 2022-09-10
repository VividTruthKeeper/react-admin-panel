// Modules
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

// Icons
import { ImStatsDots } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

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
              to={"/dashboard"}
              className="nav__img"
              onClick={() => localStorage.setItem("lastLocation", "/dashboard")}
            >
              <ImStatsDots />
            </Link>
            <GiHamburgerMenu
              type="button"
              className="nav__btn"
              onClick={() => setAside(!aside)}
            />
          </div>
          <div className="nav__right">
            <div
              className="nav__right__user"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <AiOutlineUser className="nav__right__user__img" />
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
