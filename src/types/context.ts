// Modules
import React, { SetStateAction } from "react";

// Types
import { PostType } from "../types/posts";
import { SourceType } from "../types/sources";

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
}
