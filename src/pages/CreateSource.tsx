// Modules
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { ContextType } from "../types/context";
import { PostContext } from "../context/PostContext";

// Icons
import { FaRegPlusSquare } from "react-icons/fa";

// Helpers
import { createLink, getLinks } from "../helpers/apiRequests";
import { SourceEditDataType } from "../types/sources";

const CreateSource = () => {
  const { setSources } = useContext<ContextType>(PostContext).sourceValue;
  const { popup, setPopup } = useContext<ContextType>(PostContext).popupValue;
  const navigate = useNavigate();
  const [data, setData] = useState<SourceEditDataType>({
    name: "",
    source: "",
  });
  return (
    <main className="source__create">
      <div className="container">
        <div className="source__create inner">
          <div className="dashboard__head source__head">
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaRegPlusSquare />
            </IconContext.Provider>
            <h1>Create source</h1>
          </div>

          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
            className="source__create__block"
          >
            <div className="source-edit__input">
              <label htmlFor="name">Source name</label>
              <input
                placeholder="Enter name"
                type="text"
                id="name"
                value={data.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
            </div>
            <div className="source-edit__input">
              <label htmlFor="source">Source link</label>
              <input
                placeholder="Enter link"
                type="text"
                id="source"
                value={data.source}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, source: e.target.value });
                }}
              />
            </div>
            <button
              disabled={!(data.name.length > 0 && data.source.length > 0)}
              className="source-edit__submit"
              onClick={() => {
                createLink(
                  popup,
                  setPopup,
                  data,
                  () => navigate("/source"),
                  () => getLinks(setSources)
                );
              }}
            >
              Create new source
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateSource;
