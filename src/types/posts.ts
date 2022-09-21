export interface HistoryList {
  old_published_at: Date;
  new_published_at: Date;
  PostID: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface PostType {
  id: number;
  category: string;
  title: string;
  link: string;
  publish_date: Date;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  HistoryList: HistoryList[];
}

export interface paramsType {
  id: "asc" | "desc";
  title: "asc" | "desc";
  link: "asc" | "desc";
  date: "asc" | "desc";
  published: "asc" | "desc";
  created: "asc" | "desc";
  updated: "asc" | "desc";
}
