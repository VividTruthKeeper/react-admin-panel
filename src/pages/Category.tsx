// Modules
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

// Icons
import { IoIosCreate } from "react-icons/io";
import { getLinks } from "../helpers/apiRequests";
import { LinksAll } from "../types/links";

interface dataType {
  createName: string;
  createLink: string;
  delete: number;
  updateId: number;
  updateName: string;
  updateLink: string;
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
  const defaultDate = new Date("00-00-00");

  const [all, setAll] = useState<LinksAll[]>([
    {
      id: -1,
      name: "",
      source: "",
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
                </tr>
              </thead>
              <tbody>
                {all[0].id !== -1 ? (
                  all.map((source: LinksAll) => {
                    return (
                      <tr key={uuidv4()}>
                        <td>{source.id}</td>
                        <td>{source.name}</td>
                        <td className="category__table__tab">
                          {source.source}
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
        </div>
      </div>
    </main>
  );
};

export default Category;
