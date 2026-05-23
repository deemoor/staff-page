import type { STAFF_DEPARTMENT, STAFF_ROLE } from "./constants";

export type StaffRole = (typeof STAFF_ROLE)[keyof typeof STAFF_ROLE];
export type StaffDepartment = (typeof STAFF_DEPARTMENT)[keyof typeof STAFF_DEPARTMENT];

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  department: StaffDepartment;
}