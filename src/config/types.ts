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

export type StaffRole = (typeof StaffRole)[keyof typeof StaffRole];

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  department: string;
}
