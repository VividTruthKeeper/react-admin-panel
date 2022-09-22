// Modules
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { IconContext } from "react-icons";

// Icons
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
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

interface searchType {
  type: string;
  query: string;
}

const Posts = () => {
  const [load, setLoad] = useState<boolean>(false);
  const contextValue: ContextType = useContext<ContextType>(PostContext);
  const { posts, setPosts } = contextValue.postValue;
  const { sources } = contextValue.sourceValue;
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("id");
  const [page, setPage] = useState<pageType>({
    perPage: 10,
    pageNumber: 1,
  });
  const [search, setSearch] = useState<searchType>({
    type: "fil_title",
    query: "",
  });

  const [params, setParams] = useState<paramsType>({
    id: "asc",
    title: "asc",
    link: "asc",
    date: "asc",
    published: "asc",
    created: "asc",
    updated: "asc",
  });

  useEffect(() => {
    const key = sort as keyof typeof params;
    getPosts(
      setLoad,
      setPosts,
      `?sortBy=${sort}.${params[key]}&category=${category}&strLimit=${page.perPage}&strOffset=${page.pageNumber}&${search.type}=${search.query}`
    );
  }, [params, sort, page, search, category]);

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
                id="category"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  if (e.target.value === "All") {
                    setCategory("");
                  } else {
                    setCategory(e.target.value);
                  }
                }}
              >
                <option value="All" defaultChecked>
                  All
                </option>
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
            </div>
            <div className="posts__select">
              <label htmlFor="pp">Per page</label>
              <select
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
              <label htmlFor="pp">Filter by</label>
              <select
                id="pp"
                value={search.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSearch({ ...search, type: e.target.value });
                }}
              >
                <option value="fil_title" defaultChecked>
                  Title
                </option>
                <option value="fil_link">Link</option>
                <option value="fil_publish_date">Publish date</option>
                <option value="fil_summary">Summary</option>
                <option value="fil_createdAt">Created</option>
                <option value="fil_updatedAt">Updated</option>
              </select>
            </div>
            <div className="posts__select">
              <label htmlFor="filter">Filter</label>

              <input
                type="text"
                id="filter"
                value={search.query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch({ ...search, query: e.target.value });
                }}
              />
            </div>
            <div className="posts__select  posts__reset__btn">
              <button
                className="posts__reset"
                onClick={() => {
                  setCategory("");
                  setSearch({
                    type: "fil_title",
                    query: "",
                  });
                  setPage({
                    perPage: 10,
                    pageNumber: 1,
                  });
                }}
              >
                Reset
              </button>
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
                  {sort === "id" && params.id === "asc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "id" && params.id === "desc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>ID</span>
                </th>
                <th className={sort === "category" ? "active" : ""}>
                  <span>Source</span>
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
                  {sort === "title" && params.title === "asc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "title" && params.title === "desc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Title</span>
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
                  {sort === "link" && params.link === "asc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "link" && params.link === "desc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Link</span>
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
                  {sort === "published" && params.published === "asc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "published" && params.published === "desc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Published</span>
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
                  {sort === "created" && params.created === "asc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "created" && params.created === "desc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Created</span>
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
                  {sort === "updated" && params.updated === "asc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "updated" && params.updated === "desc" ? (
                    <IconContext.Provider value={{ color: "#00785a" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Updated</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {load ? <Loader /> : null}
              {posts ? (
                posts.length > 0 ? (
                  posts[0].id !== -1 ? (
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
                    <tr>
                      <td className="table__empty" colSpan={7}>
                        No posts
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td className="table__empty" colSpan={7}>
                      No posts
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="table__empty" colSpan={7}>
                    No posts
                  </td>
                </tr>
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
