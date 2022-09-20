// Modules
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { IconContext } from "react-icons";

// Icons
import { FaAlignLeft } from "react-icons/fa";
import { userContextType } from "../types/user";

const Details = () => {
  const { user } = useContext<userContextType>(UserContext);

  return (
    <main className="details">
      <div className="container">
        <div className="details inner">
          <div className="dashboard__head">
            <IconContext.Provider value={{ color: "#8DD77F" }}>
              <FaAlignLeft className="dashboard__img" />
            </IconContext.Provider>

            <h1>Details</h1>
          </div>
          <div className="details__content">
            <form className="details__data">
              <div className="details__data__block">
                <label htmlFor="user">Username</label>
                <input
                  type="text"
                  id="user"
                  value={user.username}
                  readOnly={true}
                />
              </div>
              <div className="details__data__block">
                <label htmlFor="access">Access</label>
                <input
                  type="text"
                  id="access"
                  value={user.accessLevel}
                  readOnly={true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;
