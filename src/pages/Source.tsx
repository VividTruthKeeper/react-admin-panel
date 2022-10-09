// Modules
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useContext } from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

// Context
import { PostContext } from "../context/PostContext";

// Icons
import { FaRegPlusSquare } from "react-icons/fa";
import { FaSourcetree } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// Helpers
import { deleteLink, getLinks } from "../helpers/apiRequests";

// Types
import { LinksAll } from "../types/links";
import { ContextType } from "../types/context";

const Source = () => {
  const { sources, setSources } =
    useContext<ContextType>(PostContext).sourceValue;
  const { popup, setPopup } = useContext<ContextType>(PostContext).popupValue;
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        setDeleted(false);
        getLinks(setSources);
      }, 2000);
    }
  }, [deleted, setDeleted]);

  return (
    <main className="category">
      <div className="container">
        <div className="category inner">
          <div className="dashboard__head category__head">
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaSourcetree />
            </IconContext.Provider>
            <h1>Source</h1>
          </div>
          <div className="category__table__wrapper">
            <h3>All sources</h3>
            <table className="category__table">
              <thead>
                <tr className="category__table__head">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources ? (
                  sources.map((source: LinksAll, index: number) => {
                    return (
                      <tr key={uuidv4()}>
                        <td>{index + 1}</td>
                        <td>{source.name}</td>
                        <td className="category__table__tab">
                          {source.source}
                        </td>
                        <td className="source-action">
                          <div className="source-action__block">
                            <Link to={`/source/edit/${source.id}`}>
                              <span>Edit</span>
                              <IconContext.Provider
                                value={{ color: "#7d69ef" }}
                              >
                                <FaRegEdit />
                              </IconContext.Provider>
                            </Link>
                          </div>
                          <div className="source-action__block">
                            <button
                              onClick={() => {
                                deleteLink(
                                  setDeleted,
                                  popup,
                                  setPopup,
                                  source.id
                                );
                              }}
                            >
                              <span>Delete</span>
                              <IconContext.Provider
                                value={{ color: "#7d69ef" }}
                              >
                                <FaTrash />
                              </IconContext.Provider>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Link to="/source/create" className="source__link">
            <FaRegPlusSquare />
            <span>Create source</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Source;
