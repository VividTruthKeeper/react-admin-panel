// Modules
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useContext, useEffect, useState } from "react";
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

interface filterType {
  name: string;
  value: string;
}

interface filtersType {
  fil_title: filterType;
  fil_link: filterType;
  fil_publish_date: filterType;
  fil_summary: filterType;
  fil_created_atAt: filterType;
  fil_updated_atAt: filterType;
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

  const [params, setParams] = useState<paramsType>({
    id: "desc",
    title: "asc",
    link: "asc",
    date: "asc",
    publish_date: "asc",
    created_at: "asc",
    updated_at: "asc",
  });

  const [filters, setFilters] = useState<filtersType>({
    fil_title: {
      name: "fil_title",
      value: "",
    },
    fil_link: {
      name: "fil_link",
      value: "",
    },
    fil_publish_date: {
      name: "fil_publish_date",
      value: "",
    },
    fil_summary: {
      name: "fil_summary",
      value: "",
    },
    fil_created_atAt: {
      name: "fil_created_atAt",
      value: "",
    },
    fil_updated_atAt: {
      name: "fil_updated_atAt",
      value: "",
    },
  });

  const defineFilters = useCallback(() => {
    let outString: string = "";
    const keys: string[] = Object.keys(filters);
    keys.map((key) => {
      const keyy = key as keyof typeof filters;
      if (filters[keyy].value.length > 0) {
        outString = `${outString}&${filters[keyy].name}=${filters[keyy].value}`;
      }
    });

    return outString;
  }, [filters, setFilters]);

  useEffect(() => {
    const filters = defineFilters();
    const key = sort as keyof typeof params;
    getPosts(
      setLoad,
      setPosts,
      `?sortBy=${sort}.${params[key]}&category=${category}&strLimit=${page.perPage}&strOffset=${page.pageNumber}${filters}`
    );
  }, [params, sort, page, category, filters]);

  return (
    <main className="posts">
      <div className="container">
        <div className="posts inner">
          <div className="dashboard__head">
            <IconContext.Provider value={{ color: "#7d69ef" }}>
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
            <div className="posts__select  posts__reset__btn">
              <button
                className="posts__reset"
                onClick={() => {
                  setCategory("");
                  setPage({
                    perPage: 10,
                    pageNumber: 1,
                  });
                  setFilters({
                    fil_title: {
                      name: "fil_title",
                      value: "",
                    },
                    fil_link: {
                      name: "fil_link",
                      value: "",
                    },
                    fil_publish_date: {
                      name: "fil_publish_date",
                      value: "",
                    },
                    fil_summary: {
                      name: "fil_summary",
                      value: "",
                    },
                    fil_created_atAt: {
                      name: "fil_created_atAt",
                      value: "",
                    },
                    fil_updated_atAt: {
                      name: "fil_updated_atAt",
                      value: "",
                    },
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
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "id" && params.id === "desc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
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
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "title" && params.title === "desc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
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
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "link" && params.link === "desc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Link</span>
                </th>
                <th
                  className={sort === "publish_date" ? "active" : ""}
                  onClick={() => {
                    setSort("publish_date");
                    if (params.publish_date !== "asc")
                      setParams({ ...params, publish_date: "asc" });
                    else setParams({ ...params, publish_date: "desc" });
                  }}
                >
                  {sort === "publish_date" && params.publish_date === "asc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "publish_date" && params.publish_date === "desc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Published</span>
                </th>
                <th
                  className={sort === "created_at" ? "active" : ""}
                  onClick={() => {
                    setSort("created_at");
                    if (params.created_at !== "asc")
                      setParams({ ...params, created_at: "asc" });
                    else setParams({ ...params, created_at: "desc" });
                  }}
                >
                  {sort === "created_at" && params.created_at === "asc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "created_at" && params.created_at === "desc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Created</span>
                </th>
                <th
                  className={sort === "updated_at" ? "active" : ""}
                  onClick={() => {
                    setSort("updated_at");
                    if (params.updated_at !== "asc")
                      setParams({ ...params, updated_at: "asc" });
                    else setParams({ ...params, updated_at: "desc" });
                  }}
                >
                  {sort === "updated_at" && params.updated_at === "asc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : null}
                  {sort === "updated_at" && params.updated_at === "desc" ? (
                    <IconContext.Provider value={{ color: "#7d69ef" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  ) : null}
                  <span>Updated</span>
                </th>
              </tr>
              <tr className="posts__table__head posts__table__head--inputs">
                <th></th>
                <th></th>
                <th>
                  <input
                    placeholder="Filter by title"
                    id="filter-title"
                    type="text"
                    value={filters.fil_title.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        fil_title: {
                          ...filters.fil_title,
                          value: e.target.value,
                        },
                      })
                    }
                  />
                </th>

                <th>
                  <input
                    placeholder="Filter by link"
                    id="filter-link"
                    type="text"
                    value={filters.fil_link.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFilters({
                        ...filters,
                        fil_link: {
                          ...filters.fil_link,
                          value: e.target.value,
                        },
                      });
                    }}
                  />
                </th>
                <th>
                  <input
                    placeholder="Filter by publish_date"
                    id="filter-publish_date"
                    type="date"
                    value={filters.fil_publish_date.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFilters({
                        ...filters,
                        fil_publish_date: {
                          ...filters.fil_publish_date,
                          value: e.target.value,
                        },
                      });
                    }}
                  />
                </th>
                <th>
                  <input
                    placeholder="Filter by created_at"
                    id="filter-created_at"
                    type="date"
                    value={filters.fil_created_atAt.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFilters({
                        ...filters,
                        fil_created_atAt: {
                          ...filters.fil_created_atAt,
                          value: e.target.value,
                        },
                      });
                    }}
                  />
                </th>
                <th>
                  <input
                    placeholder="Filter by updated_at"
                    id="filter-updated_at"
                    type="date"
                    value={filters.fil_updated_atAt.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters({
                        ...filters,
                        fil_updated_atAt: {
                          ...filters.fil_updated_atAt,
                          value: e.target.value,
                        },
                      })
                    }
                  />
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
                            <td>{`${parseDate(post.publish_date)[0]}, ${
                              parseDate(post.publish_date)[1]
                            }`}</td>
                            <td>{`${parseDate(post.created_at)[0]}, ${
                              parseDate(post.created_at)[1]
                            }`}</td>
                            <td>{`${parseDate(post.created_at)[0]}, ${
                              parseDate(post.created_at)[1]
                            }`}</td>
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
