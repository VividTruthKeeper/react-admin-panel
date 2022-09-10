// Modules
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { PostType } from "../types/posts";

// Icons
import { ImNewspaper } from "react-icons/im";
import { BiLinkExternal } from "react-icons/bi";

// Helpers
import { parseDate } from "../helpers/parseDate";

const Post = () => {
  const date = new Date("0.0.0000");
  const [postData, setPostData] = useState<PostType>({
    id: -1,
    category: "",
    title: "",
    link: "",
    date: date,
    summary: "",
    createdAt: date,
    updatedAt: date,
  });
  const { posts } = useContext<any>(PostContext);
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
            <ImNewspaper />
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
                value={postData.id !== -1 ? postData.category : ""}
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
                value={postData.id !== -1 ? parseDate(postData.date)[0] : ""}
              />
            </div>
            <div className="post__content__block">
              <h4>Summary</h4>
              <textarea
                readOnly
                rows={20}
                value={postData.id !== -1 ? postData.summary : ""}
              ></textarea>
            </div>
            <div className="post__content__block">
              <h4>Created</h4>
              <input
                type={"text"}
                readOnly
                value={
                  postData.id !== -1 ? parseDate(postData.createdAt)[0] : ""
                }
              />
            </div>
            <div className="post__content__block">
              <h4>Updated</h4>
              <input
                type={"text"}
                readOnly
                value={
                  postData.id !== -1 ? parseDate(postData.updatedAt)[0] : ""
                }
              />
            </div>
            <a
              className="post__content__btn"
              href={postData.id !== -1 ? postData.link : ""}
            >
              <BiLinkExternal />
              <span>Link</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;