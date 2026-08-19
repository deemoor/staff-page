import type { Column } from "src/shared/types";

export const STAFF_ROLE = {
  Manager: 'Manager',
  Developer: 'Developer',
  Designer: 'Designer',
  Engineer: 'Engineer',
  Analyst: 'Analyst',
  Recruiter: 'Recruiter',
  SalesManager: 'Sales Manager',
  Specialist: 'Specialist',
} as const;

export const STAFF_DEPARTMENT = {
  Engineering: 'Engineering',
  Product: 'Product',
  Design: 'Design',
  Operations: 'Operations',
  People: 'HR / People',
  Marketing: 'Marketing',
  Sales: 'Sales',
  Support: 'Support',
  Finance: 'Finance',
  Legal: 'Legal',
} as const;

export const columns: Column[] = [
  { id: 'id', name: 'ID', width: 70 },
  { id: 'name', name: 'Name', flex: 1 },
  { id: 'email', name: 'Email', flex: 1.2 },
  { id: 'role', name: 'Role', flex: 1, sortable: true },
  { id: 'department', name: 'Department', flex: 1, sortable: true }
];
