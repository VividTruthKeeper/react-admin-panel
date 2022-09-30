export interface HistoryList {
  old_published_at: Date;
  new_published_at: Date;
  PostID: number;
  created_at: Date;
  updatedAt: Date;
}
export interface PostType {
  id: number;
  category: string;
  title: string;
  link: string;
  publish_date: Date;
  summary: string;
  created_at: Date;
  updatedAt: Date;
  HistoryList: HistoryList[];
}

export interface paramsType {
  id: "asc" | "desc";
  title: "asc" | "desc";
  link: "asc" | "desc";
  date: "asc" | "desc";
  publish_date: "asc" | "desc";
  created_at: "asc" | "desc";
  updated_at: "asc" | "desc";
}
