export interface SourceType {
  id: number;
  name: string;
  source: string;
  created_at: Date;
  updatedAt: Date;
}

export interface SourceEditDataType {
  name: string;
  source: string;
}
