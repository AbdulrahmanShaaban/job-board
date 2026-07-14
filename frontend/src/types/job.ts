export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobCategory = 'technology' | 'design' | 'marketing' | 'sales' | 'finance' | 'hr' | 'other';

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: JobType;
  category: JobCategory;
  salary?: string;
  deadline?: string;
  company: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  location: string;
  type: JobType;
  category: JobCategory;
  salary?: string;
  deadline?: string;
}

export interface UpdateJobInput extends Partial<CreateJobInput> {}

export interface JobsQueryParams {
  search?: string;
  category?: JobCategory;
  location?: string;
  type?: JobType;
}
