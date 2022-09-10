// Modules
import axios from "axios";

// Types
import { PostType } from "../types/posts";

export const getPosts = (setPosts: React.Dispatch<PostType[]>) => {
  axios
    .get("http://95.85.124.41:8080/posts")
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => {});
};
