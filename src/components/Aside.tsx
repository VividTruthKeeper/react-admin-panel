// Modules
import React from "react";
import { Link } from "react-router-dom";

// Icons
import Grid from "../assets/icons/grid-outline.svg";

// Types
interface Props {
  aside: boolean;
  setAside: React.Dispatch<boolean>;
}

const Aside = ({ aside, setAside }: Props) => {
  return (
    <aside className={aside ? "aside active" : "aside"}>
      <ul className="aside__list">
        <li className="aside__list__element aside__list__element--title">
          <h2>Elements</h2>
        </li>
        <li className="aside__list__element">
          <Link to={"/posts"}>
            <div className="aside__list__element__img">
              <img src={Grid} alt="" />
            </div>
            <span>Posts</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
