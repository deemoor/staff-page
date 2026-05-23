import type { StaffRole } from "./constants";

export type StaffRoleType = (typeof StaffRole)[keyof typeof StaffRole];

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: StaffRoleType;
  department: string;
}

export type ListData<T> = {
  items: T[];
  total: number;
}

export type SortOrder = 'asc' | 'desc' | undefined;

export interface ListParams {
  page?: number;
  perPage?: number;
  totalCount?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface ListFilters {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  fields?: Record<string, string>;
}

export interface Column {
  id: string,
  name: string,
  sortable?: boolean,
  flex?: number,
  width?: number
}

export interface Pagination {
  current: number;
  total: number;
}