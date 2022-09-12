// Modules
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

// Icons
import { IoIosCreate } from "react-icons/io";
import {
  createLink,
  deleteLink,
  getLinks,
  updateLink,
} from "../helpers/apiRequests";
import { capitalizeFirstLetter } from "../helpers/stringMethods";
import { LinksAll } from "../types/links";

interface dataType {
  create: string;
  delete: number;
  updateId: number;
  updateData: string;
}

interface successType {
  create: string;
  delete: string;
  update: string;
  hasCreateUpdated: boolean;
  hasDeleteUpdated: boolean;
  hasUpdateUpdated: boolean;
}

const Category = () => {
  const [data, setData] = useState<dataType>({
    create: "",
    delete: 0,
    updateId: 0,
    updateData: "",
  });

  const [success, setSuccess] = useState<successType>({
    create: "",
    delete: "",
    update: "",
    hasCreateUpdated: false,
    hasDeleteUpdated: false,
    hasUpdateUpdated: false,
  });

  const defaultDate = new Date("00-00-00");

  const [all, setAll] = useState<LinksAll[]>([
    {
      id: -1,
      link: "",
      createdAt: defaultDate,
      updatedAt: defaultDate,
    },
  ]);

  useEffect(() => {
    getLinks(setAll);
  }, []);

  return (
    <main className="category">
      <div className="container">
        <div className="category inner">
          <div className="dashboard__head category__head">
            <IoIosCreate />
            <h1>Category</h1>
          </div>
          <div className="category__table__wrapper">
            <h3>All links</h3>
            <table className="category__table">
              <tr className="category__table__head">
                <th>ID</th>
                <th>Link</th>
              </tr>
              <tbody>
                {all[0].id !== -1
                  ? all.map((link: LinksAll) => {
                      return (
                        <tr key={uuidv4()}>
                          <td>{link.id}</td>
                          <td className="category__table__tab">{link.link}</td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
          <form
            className="category__form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <div className="category__form__block">
              <label htmlFor="category">New category name</label>
              <input
                type="text"
                id="category"
                placeholder="Enter category name"
                value={data.create}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    create: capitalizeFirstLetter(e.target.value.toLowerCase()),
                  });
                }}
              />
              {success.hasCreateUpdated ? (
                success.create === "success" ? (
                  <span className="green">Category added successfuly</span>
                ) : (
                  <span className="red">Failed to add category</span>
                )
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              disabled={!(data.create.length > 0)}
              onClick={() => {
                createLink(
                  (e: string) =>
                    setSuccess({
                      ...success,
                      create: e,
                      hasCreateUpdated: true,
                    }),
                  { link: data.create }
                );
                setTimeout(() => getLinks(setAll), 500);
              }}
            >
              Add category
            </button>
          </form>
          <form
            className="category__form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <div className="category__form__block">
              <label htmlFor="update">Category ID and new name</label>
              <input
                min={0}
                type="number"
                id="update"
                placeholder="Enter category id"
                value={data.updateId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length === 0) {
                    setData({
                      ...data,
                      updateId: 0,
                    });
                  } else {
                    setData({
                      ...data,
                      updateId: parseInt(e.target.value),
                    });
                  }
                }}
              />
              <input
                type="text"
                id="category"
                placeholder="Enter category name"
                value={data.updateData}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    updateData: capitalizeFirstLetter(
                      e.target.value.toLowerCase()
                    ),
                  });
                }}
              />
              {success.hasUpdateUpdated ? (
                success.update === "success" ? (
                  <span className="green">Category updated successfuly</span>
                ) : (
                  <span className="red">Failed to update category</span>
                )
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              disabled={!(data.updateData.length > 0 && data.updateId !== 0)}
              onClick={() => {
                updateLink(
                  (e: string) =>
                    setSuccess({
                      ...success,
                      update: e,
                      hasUpdateUpdated: true,
                    }),
                  data.updateId,
                  { link: data.updateData }
                );
                setTimeout(() => getLinks(setAll), 500);
              }}
            >
              Update category
            </button>
          </form>
          <form
            className="category__form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <div className="category__form__block">
              <label htmlFor="id">Delete category</label>
              <input
                min={0}
                type="number"
                id="id"
                placeholder="Enter category id"
                value={data.delete}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length === 0) {
                    setData({
                      ...data,
                      delete: 0,
                    });
                  } else {
                    setData({
                      ...data,
                      delete: parseInt(e.target.value),
                    });
                  }
                }}
              />
              {success.hasDeleteUpdated ? (
                success.delete === "success" ? (
                  <span className="green">Category deleted successfuly</span>
                ) : (
                  <span className="red">Failed to delete category</span>
                )
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              disabled={!(data.delete > 0)}
              onClick={() => {
                deleteLink(
                  (e: string) =>
                    setSuccess({
                      ...success,
                      delete: e,
                      hasDeleteUpdated: true,
                    }),
                  data.delete
                );
                setTimeout(() => getLinks(setAll), 500);
              }}
            >
              Delete category
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Category;
