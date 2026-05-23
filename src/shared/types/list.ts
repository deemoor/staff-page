export interface ListData<T> {
  items: T[];
  total: number;
}

export interface Column {
  id: string,
  name: string,
  sortable?: boolean,
  flex?: number,
  width?: number
}

export interface WithId {
  id: string | number;
}