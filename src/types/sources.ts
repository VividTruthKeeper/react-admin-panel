export interface SourceType {
  id: number;
  name: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SourceEditDataType {
  name: string;
  source: string;
}
