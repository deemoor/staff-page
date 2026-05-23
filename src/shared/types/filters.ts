import type { Dispatch, SetStateAction } from "react";

export type SortOrder = 'asc' | 'desc' | undefined;

export type FiltersFields = Record<string, string | string[]>;

export interface Filters {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  fields?: FiltersFields;
}

export interface FiltersFormProps {
  draftSearch: Filters['search'];
  setDraftSearch: Dispatch<SetStateAction<Filters['search']>>;
  draftFields: Filters['fields'];
  setDraftFields: Dispatch<SetStateAction<Filters['fields']>>;
}