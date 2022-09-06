// Modules
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Icons
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { AiOutlineBlock } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgDetailsLess } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

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
          <AiOutlineBlock className="aside__img" />
          <h2>Elements</h2>
        </li>
        <li className="aside__list__element">
          <Link to={"/posts"}>
            <BsFillFileEarmarkPostFill className="aside__list__element__img" />
            <span>Posts</span>
          </Link>
        </li>
        <li className="aside__list__element aside__list__element--title">
          <MdOutlineManageAccounts className="aside__img" />
          <h2>Account</h2>
        </li>
        <li className="aside__list__element">
          <Link to={"/user_details"}>
            <CgDetailsLess className="aside__list__element__img" />
            <span>Details</span>
          </Link>
        </li>
        <li
          className="aside__list__element"
          onClick={() => {
            localStorage.removeItem("userData");
            setUser({ username: "", accessLevel: "" });
          }}
        >
          <div>
            <BiLogOut className="aside__list__element__img" />
            <span>Log out</span>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
