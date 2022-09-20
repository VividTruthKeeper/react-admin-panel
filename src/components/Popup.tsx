// Modules
import { IconContext } from "react-icons";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

// Icons
import { FaCheck } from "react-icons/fa";

// Types

import { ContextType } from "../types/context";

const Popup = () => {
  const { pop, remove, message } =
    useContext<ContextType>(PostContext).popupValue.popup;
  return (
    <div className="popup__wrapper">
      <div className="popup__wrapper__inner">
        <div
          className={
            remove ? "popup active disabled" : pop ? "popup active" : "popup"
          }
        >
          <IconContext.Provider value={{ color: "#8DD77F" }}>
            <FaCheck />
          </IconContext.Provider>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
