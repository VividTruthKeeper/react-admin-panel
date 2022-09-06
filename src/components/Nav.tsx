// Modules
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

// Icons
import Orient from "../assets/icons/logo_orient.svg";
import Burger from "../assets/icons/burger.svg";
import Profile from "../assets/icons/profile.svg";

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
            <div className="nav__img">
              <img src={Orient} alt="orient" />
            </div>
            <button
              type="button"
              className="nav__btn"
              onClick={() => setAside(!aside)}
            >
              <img src={Burger} alt="" />
            </button>
          </div>
          <div className="nav__right">
            <div
              className="nav__right__user"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <div className="nav__right__user__img">
                <img src={Profile} alt="" />
              </div>
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
