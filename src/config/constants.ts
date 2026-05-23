import type { ListFilters } from "./types";

export const StaffRole = {
  EngineeringManager: 'Engineering Manager',
  FrontendDeveloper: 'Frontend Developer',
  BackendDeveloper: 'Backend Developer',
  FullstackDeveloper: 'Fullstack Developer',
  QAEngineer: 'QA Engineer',
  DevOpsEngineer: 'DevOps Engineer',
  SystemAdministrator: 'System Administrator',
  SecurityEngineer: 'Security Engineer',
  UXUIDesigner: 'UX/UI Designer',
  ProductDesigner: 'Product Designer',
  ProductManager: 'Product Manager',
  ProjectManager: 'Project Manager',
  HRBusinessPartner: 'HR Business Partner',
  Recruiter: 'Recruiter',
  DataAnalyst: 'Data Analyst',
  MarketingManager: 'Marketing Manager',
  SalesManager: 'Sales Manager',
  CustomerSupportSpecialist: 'Customer Support Specialist',
  FinanceAnalyst: 'Finance Analyst',
  LegalCounsel: 'Legal Counsel',
} as const;

export const DEFAULT_PAGE = 0;
export const DEFAULT_PERPAGE = 10;
export const PERPAGE_OPTIONS = [10, 20, 30];

export const initialFilters: ListFilters = {
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PERPAGE,
  sortBy: 'id',
  sortOrder: 'asc',
  search: '',
  fields: {}
};