import type { Filters } from "../types";

export const DEFAULT_PAGE = 0;
export const DEFAULT_PERPAGE = 10;
export const PERPAGE_OPTIONS = [10, 20, 30];

export const initFilters: Filters = {
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PERPAGE
};
