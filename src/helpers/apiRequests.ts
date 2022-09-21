// Modules
import axios from "axios";
import React, { SetStateAction } from "react";

// Types
import { PostType } from "../types/posts";
import { LinksAll } from "../types/links";
import { PopupType } from "../types/popup";

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

export const deleteLink = (
  setSuccess: React.Dispatch<boolean>,
  popup: PopupType,
  setPopup: React.Dispatch<SetStateAction<PopupType>>,
  id: number
) => {
  axios
    .delete(`http://95.85.124.41:8080/link/delete/${id}`)
    .then((res) => {
      setSuccess(true);
      setPopup({ ...popup, success: true, pop: true });
      setTimeout(() => {
        setPopup({ ...popup, pop: false });
      }, 2000);
    })
    .catch((err) => {
      setSuccess(false);
      setPopup({ ...popup, success: false, pop: true });
      setTimeout(() => {
        setPopup({ ...popup, pop: false });
      }, 2000);
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
  popup: PopupType,
  setPopup: React.Dispatch<SetStateAction<PopupType>>,
  data: { name: string; source: string },
  navigate: () => void,
  getLinks: () => void
) => {
  axios
    .post("http://95.85.124.41:8080/link/create", {
      name: data.name,
      source: data.source,
    })
    .then((res) => {
      setPopup({ ...popup, success: true, pop: true });
      navigate();
      setTimeout(() => {
        setPopup({ ...popup, pop: false });
        getLinks();
      }, 2000);
    })
    .catch((err) => {
      setPopup({ ...popup, success: false, pop: true });
      setTimeout(() => {
        setPopup({ ...popup, pop: false });
      }, 2000);
    });
};

export const updateLink = (
  popup: PopupType,
  setPopup: React.Dispatch<SetStateAction<PopupType>>,
  navigate: () => void,
  getLinks: () => void,
  id: number,
  data: { name: string; source: string }
) => {
  axios
    .put(`http://95.85.124.41:8080/link/update/${id}`, data)
    .then((res) => {
      setPopup({ ...popup, success: true, pop: true });
      navigate();
      setTimeout(() => {
        setPopup({ ...popup, pop: false });
        getLinks();
      }, 2000);
    })
    .catch((err) => {
      setPopup({ ...popup, success: false, pop: true });
      setTimeout(() => {
        setPopup({ ...popup, pop: false });
      }, 2000);
    });
};
