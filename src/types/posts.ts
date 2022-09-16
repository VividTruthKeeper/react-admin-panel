export interface PostType {
  id: number;
  category: string;
  title: string;
  link: string;
  publish_date: Date;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface paramsType {
  id: "asc" | "desc";
  category: "asc" | "desc";
  title: "asc" | "desc";
  link: "asc" | "desc";
  date: "asc" | "desc";
  summary: "asc" | "desc";
}
