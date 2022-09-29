// Modules
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

// Icons
import { FaRegEdit } from "react-icons/fa";

// Types
import { SourceType, SourceEditDataType } from "../types/sources";
import { ContextType } from "../types/context";

// Helpers
import { getLinks, updateLink } from "../helpers/apiRequests";

const EditSource = () => {
  const navigate = useNavigate();
  const { sources, setSources } =
    useContext<ContextType>(PostContext).sourceValue;
  const { popup, setPopup } = useContext<ContextType>(PostContext).popupValue;
  const [source, setSource] = useState<SourceType>();
  useEffect(() => {
    if (sources) {
      sources.map((post: SourceType) => {
        if (post.id.toString() === id) {
          setSource(post);
        }
      });
    }
  }, [sources]);

  const { id } = useParams();
  const [data, setData] = useState<SourceEditDataType>({
    name: "",
    source: "",
  });

  return (
    <main className="source-edit">
      <div className="container">
        <div className="source-edit inner">
          <div className="dashboard__head source-edit__head">
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaRegEdit className="dashboard__img" />
            </IconContext.Provider>
            <h1>Edit source</h1>
          </div>
          <div className="source-edit__content">
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              }}
            >
              <div className="source-edit__info">
                <h2>Information</h2>
                <div className="source-edit__input">
                  <label htmlFor="id">Source ID</label>
                  <input
                    readOnly
                    type="text"
                    id="id"
                    value={source ? source.id : ""}
                  />
                </div>
                <div className="source-edit__input">
                  <label htmlFor="name">Source old name</label>
                  <input
                    readOnly
                    type="text"
                    id="name"
                    value={source ? source.name : ""}
                  />
                </div>
                <div className="source-edit__input">
                  <label htmlFor="source">Source old link</label>
                  <input
                    readOnly
                    type="text"
                    id="source"
                    value={source ? source.source : ""}
                  />
                </div>
              </div>
              <div className="source-edit__content">
                <h2>Edit</h2>
                <div className="source-edit__input">
                  <label htmlFor="new_name">Source new name</label>
                  <input
                    placeholder="Enter new name"
                    type="text"
                    id="new_name"
                    value={data.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
                <div className="source-edit__input">
                  <label htmlFor="new_source">Source new link</label>
                  <input
                    placeholder="Enter new link"
                    type="text"
                    id="new_source"
                    value={data.source}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setData({ ...data, source: e.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                disabled={!(data.name.length > 0 && data.source.length > 0)}
                className="source-edit__submit"
                onClick={() => {
                  updateLink(
                    popup,
                    setPopup,
                    () => navigate("/source"),
                    () => getLinks(setSources),
                    id ? parseInt(id) : 0,
                    data
                  );
                }}
              >
                Update source
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditSource;
