export type UserRole = 'applicant' | 'company' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  isApproved?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
