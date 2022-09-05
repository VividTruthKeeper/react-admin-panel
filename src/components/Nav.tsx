// Modules
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// Icons
import Orient from "../assets/icons/logo_orient.svg";
import Burger from "../assets/icons/burger.svg";

// Types
import { userContextType } from "../types/user";
interface Props {
  aside: boolean;
  setAside: React.Dispatch<boolean>;
}

const Nav = ({ aside, setAside }: Props) => {
  const { user, setUser }: userContextType = useContext(UserContext);
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
            <div className="nav__right__user">
              <h2>
                <span>User:</span> {" " + user.username && user.username}
              </h2>
              <h3>
                <span>Access:</span>{" "}
                {" " + user.accessLevel && user.accessLevel}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
