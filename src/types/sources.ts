export interface SourceType {
  id: number;
  name: string;
  source: string;
  created_at: Date;
  updated_at: Date;
}

export interface SourceEditDataType {
  name: string;
  source: string;
}
