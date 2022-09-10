// Modules
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";

// Icons
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";

// Helpers
import { getPosts } from "../helpers/apiRequests";
import { PostType } from "../types/posts";
import { Link } from "react-router-dom";
import { parseDate } from "../helpers/parseDate";

// Data
const headers: string[] = [
  "ID",
  "Category",
  "Title",
  "Link",
  "Date",
  "Summary",
];

const Posts = () => {
  const { posts, setPosts } = useContext<any>(PostContext);
  const [category, setCategory] = useState<string>("All");
  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <main className="posts">
      <div className="container">
        <div className="posts inner">
          <div className="dashboard__head">
            <BsFillFileEarmarkPostFill className="dashboard__img" />
            <h1>Posts</h1>
          </div>
          <div className="posts_select">
            <select
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategory(e.target.value);
              }}
            >
              <option value="All" defaultChecked>
                All
              </option>
              <option value="TurkmenPortal">TurkmenPortal</option>
              <option value="Orient">Orient</option>
            </select>
          </div>
          <table className="posts__table">
            <tbody>
              <tr className="posts__table__head">
                {headers.map((header: string) => {
                  return <th key={uuidv4()}>{header}</th>;
                })}
              </tr>
              {posts[0].id !== -1
                ? category === "All"
                  ? posts.map((post: PostType, index: number) => {
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
                            <td>{parseDate(post.date)[0]}</td>
                            <td>{post.summary}</td>
                            <td>{parseDate(post.createdAt)[0]}</td>
                            <td>{parseDate(post.updatedAt)[0]}</td>
                          </tr>
                        </Link>
                      );
                    })
                  : posts.map((post: PostType, index: number) => {
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
                              <td>{parseDate(post.date)[0]}</td>
                              <td>{post.summary}</td>
                            </tr>
                          </Link>
                        );
                      } else {
                        return "";
                      }
                    })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Posts;
