import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  pendingCompanies: number;
}

export interface PendingCompany {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  companyName?: string;
  isApproved?: boolean;
  createdAt: string;
}

export const useAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const { data } = await api.get<AdminStats>('/admin/stats');
      return data;
    },
  });
};

export const usePendingCompanies = () => {
  return useQuery<PendingCompany[]>({
    queryKey: ['admin', 'pending-companies'],
    queryFn: async () => {
      const { data } = await api.get<PendingCompany[]>('/admin/companies/pending');
      return data;
    },
  });
};

export const useApproveCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyId: string) => {
      await api.put(`/admin/companies/${companyId}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-companies'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
};

export const useAdminDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      await api.delete(`/admin/jobs/${jobId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
};

export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await api.delete(`/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
};

export const useAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data } = await api.get<User[]>('/admin/users');
      return data;
    },
  });
};
