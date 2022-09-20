// Modules
import axios from "axios";
import React from "react";

// Types
import { PostType } from "../types/posts";
import { LinksAll } from "../types/links";

export const getPosts = (
  setLoad: React.Dispatch<boolean>,
  setPosts: React.Dispatch<PostType[]>,
  params?: string
) => {
  setLoad(true);
  axios
    .get("http://95.85.124.41:8080/posts" + (params ? params : ""))
    .then((res) => {
      setPosts(res.data.data);
    })
    .catch((err) => {})
    .finally(() => setLoad(false));
};

export const deleteLink = (setSuccess: React.Dispatch<boolean>, id: number) => {
  axios
    .delete(`http://95.85.124.41:8080/link/delete/${id}`)
    .then((res) => {
      setSuccess(true);
    })
    .catch((err) => {
      setSuccess(false);
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
  data: { name: string; source: string }
) => {
  axios
    .post("http://95.85.124.41:8080/link/create", {
      name: data.name,
      source: data.source,
    })
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
  data: { name: string; source: string }
) => {
  axios
    .put(`http://95.85.124.41:8080/link/update/${id}`, data)
    .then((res) => {
      setSuccess(res.data.message);
    })
    .catch((err) => {
      setSuccess("error");
    });
};
