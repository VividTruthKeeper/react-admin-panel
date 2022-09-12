// Modules
import axios from "axios";
import React from "react";

// Types
import { PostType } from "../types/posts";
import { LinksAll } from "../types/links";

export const getPosts = (setPosts: React.Dispatch<PostType[]>) => {
  axios
    .get("http://95.85.124.41:8080/posts")
    .then((res) => {
      setPosts(res.data.data);
    })
    .catch((err) => {});
};

export const deleteLink = (setSuccess: React.Dispatch<string>, id: number) => {
  axios
    .delete(`http://95.85.124.41:8080/link/delete/${id}`)
    .then((res) => {
      setSuccess(res.data.message);
    })
    .catch((err) => {
      setSuccess("error");
    });
};

export const getLinks = (setLinks: React.Dispatch<LinksAll[]>) => {
  axios
    .get("http://95.85.124.41:8080/links/all")
    .then((res) => {
      setLinks(res.data.data);
    })
    .catch((err) => {});
};

export const createLink = (
  setSuccess: React.Dispatch<string>,
  data: { link: string }
) => {
  axios
    .post("http://95.85.124.41:8080/link/create", { link: data.link })
    .then((res) => {
      setSuccess(res.data.message);
    })
    .catch((err) => {
      setSuccess("error");
    });
};

export const updateLink = (
  setSuccess: React.Dispatch<string>,
  id: number,
  data: { link: string }
) => {
  axios
    .put(`http://95.85.124.41:8080/link/update/${id}`, { link: data.link })
    .then((res) => {
      setSuccess(res.data.message);
    })
    .catch((err) => {
      setSuccess("error");
    });
};
