// Modules
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { IconContext } from "react-icons";

// Icons
import { FaBox } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

// Helpers
import { getPosts } from "../helpers/apiRequests";
import { PostType } from "../types/posts";
import { Link } from "react-router-dom";
import { parseDate } from "../helpers/parseDate";

// Types
import { paramsType } from "../types/posts";
import { ContextType } from "../types/context";

// Components
import Loader from "../components/Loader";

interface pageType {
  perPage: number;
  pageNumber: number;
}

const Posts = () => {
  const [load, setLoad] = useState<boolean>(false);
  const contextValue: ContextType = useContext<ContextType>(PostContext);
  const { posts, setPosts } = contextValue.postValue;
  const { sources } = contextValue.sourceValue;
  const [showAll, setShowAll] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("id");
  const [page, setPage] = useState<pageType>({
    perPage: 10,
    pageNumber: 1,
  });

  const [params, setParams] = useState<paramsType>({
    id: "asc",
    source: "asc",
    title: "asc",
    link: "asc",
    date: "asc",
    published: "asc",
    created: "asc",
    updated: "asc",
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const key = sort as keyof typeof params;
    getPosts(
      setLoad,
      setPosts,
      `?sortBy=${sort}.${params[key]}&strLimit=${page.perPage}&strOffset=${page.pageNumber}&filter=${search}`
    );
  }, [params, sort, page, search]);

  useEffect(() => {
    if (!showAll) {
      setPage({ ...page, perPage: 60 });
    }
  }, [showAll, page.perPage]);

  return (
    <main className="posts">
      <div className="container">
        <div className="posts inner">
          <div className="dashboard__head">
            <IconContext.Provider value={{ color: "#8DD77F" }}>
              <FaBox className="dashboard__img" />
            </IconContext.Provider>
            <h1>Posts</h1>
          </div>
          <div className="posts__select__wrapper">
            <div className="posts__select">
              <label htmlFor="category">Source</label>
              <select
                disabled={showAll}
                id="category"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setCategory(e.target.value);
                }}
              >
                {sources
                  ? sources.map((source) => {
                      return (
                        <option key={uuidv4()} value={source.name}>
                          {source.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
              <label>
                <span>Show all</span>
                <input
                  type="checkbox"
                  defaultChecked
                  value={showAll.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShowAll(e.target.checked)
                  }
                />
              </label>
            </div>
            <div className="posts__select">
              <label htmlFor="pp">Per page</label>
              <select
                disabled={!showAll}
                id="pp"
                value={page.perPage}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setPage({ ...page, perPage: parseInt(e.target.value) });
                }}
              >
                <option value="10" defaultChecked>
                  10
                </option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="posts__select">
              <label htmlFor="filter">Filter</label>
              <input
                type="text"
                id="filter"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <table className={load ? "posts__table disabled" : "posts__table"}>
            <thead>
              <tr className="posts__table__head">
                <th
                  className={sort === "id" ? "active" : ""}
                  onClick={() => {
                    setSort("id");
                    if (params.id !== "asc")
                      setParams({ ...params, id: "asc" });
                    else setParams({ ...params, id: "desc" });
                  }}
                >
                  ID
                </th>
                <th
                  className={sort === "category" ? "active" : ""}
                  onClick={() => {
                    setSort("source");
                    if (params.source !== "asc")
                      setParams({ ...params, source: "asc" });
                    else setParams({ ...params, source: "desc" });
                  }}
                >
                  Source
                </th>
                <th
                  className={sort === "title" ? "active" : ""}
                  onClick={() => {
                    setSort("title");
                    if (params.title !== "asc")
                      setParams({ ...params, title: "asc" });
                    else setParams({ ...params, title: "desc" });
                  }}
                >
                  Title
                </th>
                <th
                  className={sort === "link" ? "active" : ""}
                  onClick={() => {
                    setSort("link");
                    if (params.link !== "asc")
                      setParams({ ...params, link: "asc" });
                    else setParams({ ...params, link: "desc" });
                  }}
                >
                  Link
                </th>
                <th
                  className={sort === "published" ? "active" : ""}
                  onClick={() => {
                    setSort("published");
                    if (params.published !== "asc")
                      setParams({ ...params, published: "asc" });
                    else setParams({ ...params, published: "desc" });
                  }}
                >
                  Published
                </th>
                <th
                  className={sort === "created" ? "active" : ""}
                  onClick={() => {
                    setSort("created");
                    if (params.created !== "asc")
                      setParams({ ...params, created: "asc" });
                    else setParams({ ...params, created: "desc" });
                  }}
                >
                  Created
                </th>
                <th
                  className={sort === "updated" ? "active" : ""}
                  onClick={() => {
                    setSort("updated");
                    if (params.updated !== "asc")
                      setParams({ ...params, updated: "asc" });
                    else setParams({ ...params, updated: "desc" });
                  }}
                >
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {load ? <Loader /> : null}
              {posts ? (
                posts[0].id !== -1 ? (
                  showAll ? (
                    posts.map((post: PostType) => {
                      return (
                        <Link
                          className="post-link"
                          to={`/posts/${post.id}`}
                          key={uuidv4()}
                        >
                          <tr>
                            <td>{post.id}</td>
                            <td>{post.category}</td>
                            <td>{post.title}</td>
                            <td>
                              <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <BiLinkExternal />
                              </a>
                            </td>
                            <td>{parseDate(post.publish_date)[0]}</td>
                            <td>{parseDate(post.createdAt)[0]}</td>
                            <td>{parseDate(post.updatedAt)[0]}</td>
                          </tr>
                        </Link>
                      );
                    })
                  ) : (
                    posts.map((post: PostType, index: number) => {
                      if (post.category === category) {
                        return (
                          <Link
                            className="post-link"
                            to={`/posts/${post.id}`}
                            key={uuidv4()}
                          >
                            <tr>
                              <td>{index + 1}</td>
                              <td>{post.category}</td>
                              <td>{post.title}</td>
                              <td>
                                <a
                                  href={post.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <BiLinkExternal />
                                </a>
                              </td>
                              <td>{parseDate(post.publish_date)[0]}</td>
                              <td>{parseDate(post.createdAt)[0]}</td>
                              <td>{parseDate(post.updatedAt)[0]}</td>
                            </tr>
                          </Link>
                        );
                      } else {
                        return "";
                      }
                    })
                  )
                ) : (
                  ""
                )
              ) : (
                <td>
                  <tr className="table__empty">No posts</tr>
                </td>
              )}
            </tbody>
          </table>
          <div className="posts__pagination">
            <button
              type="button"
              disabled={page.pageNumber === 1}
              onClick={() =>
                setPage({ ...page, pageNumber: page.pageNumber - 1 })
              }
            >
              Previous
            </button>
            <input type="text" value={page.pageNumber} readOnly />
            <button
              disabled={posts ? false : true}
              type="button"
              onClick={() =>
                setPage({ ...page, pageNumber: page.pageNumber + 1 })
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Posts;
