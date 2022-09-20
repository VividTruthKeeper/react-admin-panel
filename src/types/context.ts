// Modules
import React, { SetStateAction } from "react";

// Types
import { PostType } from "../types/posts";
import { SourceType } from "../types/sources";
import { PopupType } from "./popup";

// Context type

export interface ContextType {
  postValue: {
    posts: PostType[];
    setPosts: React.Dispatch<SetStateAction<PostType[]>>;
  };
  sourceValue: {
    sources: SourceType[];
    setSources: React.Dispatch<SetStateAction<SourceType[]>>;
  };
  popupValue: {
    popup: PopupType;
    setPopup: React.Dispatch<SetStateAction<PopupType>>;
  };
}
