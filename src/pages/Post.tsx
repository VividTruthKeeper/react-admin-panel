// Modules
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { PostType } from "../types/posts";
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
  const date = new Date("0.0.0000");
  const [postData, setPostData] = useState<PostType>({
    id: -1,
    category: "",
    title: "",
    link: "",
    publish_date: date,
    summary: "",
    createdAt: date,
    updatedAt: date,
  });
  const { posts } = useContext<ContextType>(PostContext).postValue;
  const { id } = useParams();

  useEffect(() => {
    if (posts[0].id !== -1) {
      posts.map((post: PostType) => {
        if (post.id.toString() === id) {
          setPostData(post);
        }
      });
    }
  }, [posts]);
  return (
    <main className="post">
      <div className="container">
        <div className="post inner">
          <div className="dashboard__head post__head">
            <IconContext.Provider value={{ color: "#8DD77F" }}>
              <FaBoxOpen className="dashboard__img" />
            </IconContext.Provider>
            <h1 className="post__head">
              {postData.id !== -1 ? postData.title : ""}
            </h1>
          </div>
          <div className="post__content">
            <div className="post__content__block">
              <h4>ID</h4>
              <input
                type="text"
                readOnly
                value={postData.id !== -1 ? postData.id : ""}
              />
            </div>
            <div className="post__content__block">
              <h4>Category</h4>
              <input
                type="text"
                readOnly
                value={
                  postData.id !== -1
                    ? capitalizeFirstLetter(postData.category.toLowerCase())
                    : ""
                }
              />
            </div>
            <div className="post__content__block">
              <h4>Title</h4>
              <input
                type="text"
                readOnly
                value={postData.id !== -1 ? postData.title : ""}
              />
            </div>
            <div className="post__content__block">
              <h4>Date</h4>
              <input
                type={"text"}
                readOnly
                value={
                  postData.id !== -1 ? parseDate(postData.publish_date)[0] : ""
                }
              />
            </div>
            <div className="post__content__block">
              <h4>Summary</h4>
              <textarea
                readOnly
                rows={5}
                value={postData.id !== -1 ? postData.summary : ""}
              ></textarea>
            </div>
            <a
              className="post__content__btn"
              href={postData.id !== -1 ? postData.link : ""}
            >
              <IconContext.Provider value={{ color: "#FFFFFF" }}>
                <BiLinkExternal />
              </IconContext.Provider>

              <span>Link</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;
