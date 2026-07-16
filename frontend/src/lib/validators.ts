import { z } from 'zod';

// Auth validators
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['applicant', 'company', 'admin'], {
    message: 'Role is required',
  }),
  companyName: z.string().optional(),
}).refine(
  (data) => data.role !== 'company' || data.companyName,
  {
    message: 'Company name is required for company accounts',
    path: ['companyName'],
  }
);

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Job validators
export const jobTypeSchema = z.enum(['full-time', 'part-time', 'contract', 'internship']);
export const jobCategorySchema = z.enum(['technology', 'design', 'marketing', 'sales', 'finance', 'hr', 'other']);

export const createJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  type: jobTypeSchema,
  category: jobCategorySchema,
  salary: z.string().optional(),
  deadline: z.string().optional(),
});

export const updateJobSchema = createJobSchema.partial();

export const jobsQuerySchema = z.object({
  search: z.string().optional(),
  category: jobCategorySchema.optional(),
  location: z.string().optional(),
  type: jobTypeSchema.optional(),
});

// Application validators
export const applicationStatusSchema = z.enum(['pending', 'accepted', 'rejected']);

export const createApplicationSchema = z.object({
  coverLetter: z.string().min(10, 'Cover letter must be at least 10 characters'),
});

export const updateApplicationStatusSchema = z.object({
  status: applicationStatusSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobsQueryInput = z.infer<typeof jobsQuerySchema>;
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
