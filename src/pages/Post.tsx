// Modules
import { v4 as uuidv4 } from "uuid";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { HistoryList, PostType } from "../types/posts";
import { IconContext } from "react-icons";

// Icons
import { FaBoxOpen } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

// Helpers
import { parseDate } from "../helpers/parseDate";
import { capitalizeFirstLetter } from "../helpers/stringMethods";

// Types
import { ContextType } from "../types/context";

const Post = () => {
  const [postData, setPostData] = useState<PostType>();
  const { posts } = useContext<ContextType>(PostContext).postValue;
  const { id } = useParams();

  useEffect(() => {
    if (posts) {
      if (posts[0].id !== -1) {
        posts.map((post: PostType) => {
          if (post.id.toString() === id) {
            setPostData(post);
          }
        });
      }
    }
  }, [posts]);
  return (
    <main className="post">
      <div className="container">
        <div className="post inner">
          <div className="dashboard__head post__head">
            <IconContext.Provider value={{ color: "#7d69ef" }}>
              <FaBoxOpen className="dashboard__img" />
            </IconContext.Provider>
            <h1 className="post__head">{postData ? postData.title : ""}</h1>
          </div>
          <div className="post__date">
            <h4>
              {postData
                ? postData.publish_date
                  ? `${parseDate(postData.publish_date)[0]}, ${
                      parseDate(postData.publish_date)[1]
                    }`
                  : ""
                : ""}
            </h4>
          </div>
          <div className="post__content">
            <div className="post__content__block">
              <h4>Category</h4>
              <input
                type="text"
                readOnly
                value={postData ? postData.category : ""}
              />
            </div>
            <div className="post__content__block">
              <h4>Summary</h4>
              <textarea
                readOnly
                value={postData ? postData.summary : ""}
              ></textarea>
            </div>

            <a
              className="post__content__btn"
              href={postData ? postData.link : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconContext.Provider value={{ color: "#FFFFFF" }}>
                <BiLinkExternal />
              </IconContext.Provider>

              <span>Link</span>
            </a>
            {postData ? (
              postData.HistoryList.length > 0 ? (
                <div className="post__content__block post__content__table">
                  <h2>History List</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Post ID</th>
                        <th>Old published</th>
                        <th>New published</th>
                        <th>Created</th>
                        <th>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postData
                        ? postData.HistoryList.length > 0
                          ? postData.HistoryList.map((History: HistoryList) => {
                              return (
                                <tr key={uuidv4()}>
                                  <td>{History.PostID}</td>
                                  <td>
                                    {`${
                                      parseDate(History.old_published_at)[0]
                                    }, ${
                                      parseDate(History.old_published_at)[1]
                                    }`}
                                  </td>
                                  <td>
                                    {`${
                                      parseDate(History.new_published_at)[0]
                                    }, ${
                                      parseDate(History.new_published_at)[1]
                                    }`}
                                  </td>
                                  <td>{`${parseDate(History.created_at)[0]}, ${
                                    parseDate(History.created_at)[1]
                                  }`}</td>
                                  <td>{`${parseDate(History.updatedAt)[0]}, ${
                                    parseDate(History.updatedAt)[1]
                                  }`}</td>
                                </tr>
                              );
                            })
                          : ""
                        : ""}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;
