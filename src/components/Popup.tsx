// Modules
import { IconContext } from "react-icons";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

// Icons
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

// Types

import { ContextType } from "../types/context";

const Popup = () => {
  const { pop, message, success } =
    useContext<ContextType>(PostContext).popupValue.popup;
  return (
    <div className="popup__wrapper">
      <div className="popup__wrapper__inner">
        <div className={pop ? "popup active" : "popup"}>
          {success ? (
            <IconContext.Provider value={{ color: "#8DD77F" }}>
              <FaRegThumbsUp />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "red" }}>
              <FaRegThumbsDown />
            </IconContext.Provider>
          )}
          <span>{success ? message.success : message.failure}</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
