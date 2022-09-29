// Modules
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IconContext } from "react-icons";

// Icons
import { FaBox } from "react-icons/fa";
import { FaHive } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaAlignLeft } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSourcetree } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

// Types
import { userContextType } from "../types/user";
interface Props {
  aside: boolean;
  setAside: React.Dispatch<boolean>;
}

const Aside = ({ aside, setAside }: Props) => {
  const { setUser }: userContextType = useContext(UserContext);
  return (
    <aside className={aside ? "aside active" : "aside"}>
      <ul className="aside__list">
        <li className="aside__list__element aside__list__element--title">
          <IconContext.Provider value={{ color: "#7d69ef" }}>
            <FaHive className="aside__img" />
          </IconContext.Provider>

          <h2>Posts</h2>
        </li>
        <li className="aside__list__element">
          <Link
            to={"/posts"}
            onClick={() => localStorage.setItem("lastLocation", "/posts")}
          >
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaBox className="aside__list__element__img" />
            </IconContext.Provider>

            <span>Posts</span>
          </Link>
        </li>
        <li className="aside__list__element aside__list__element--title">
          <IconContext.Provider value={{ color: "#7d69ef" }}>
            <FaSourcetree />
          </IconContext.Provider>

          <h2>Source</h2>
        </li>
        <li className="aside__list__element">
          <Link
            to={"/source"}
            onClick={() => localStorage.setItem("lastLocation", "/source")}
          >
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaLink className="aside__list__element__img" />
            </IconContext.Provider>

            <span>Source</span>
          </Link>
        </li>
        <li className="aside__list__element">
          <Link to={"/source/create"}>
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaRegPlusSquare className="aside__list__element__img" />
            </IconContext.Provider>

            <span>Create source</span>
          </Link>
        </li>
        <li className="aside__list__element aside__list__element--title">
          <IconContext.Provider value={{ color: "#7d69ef" }}>
            <MdOutlineManageAccounts className="aside__img" />
          </IconContext.Provider>

          <h2>Account</h2>
        </li>
        <li
          className="aside__list__element"
          onClick={() => {
            localStorage.removeItem("userData");
            setUser({ username: "", accessLevel: "" });
          }}
        >
          <div>
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaSignOutAlt className="aside__list__element__img" />
            </IconContext.Provider>
            <span>Log out</span>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
