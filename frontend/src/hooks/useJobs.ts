import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Job, CreateJobInput, UpdateJobInput, JobsQueryParams } from '@/types/job';

export const useJobs = (params?: JobsQueryParams) => {
  return useQuery<Job[]>({
    queryKey: ['jobs', params],
    queryFn: async () => {
      const { data } = await api.get<Job[]>('/jobs', { params });
      return data;
    },
  });
};

export const useJob = (id: string) => {
  return useQuery<Job>({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await api.get<Job>(`/jobs/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useMyJobs = () => {
  return useQuery<Job[]>({
    queryKey: ['jobs', 'my-jobs'],
    queryFn: async () => {
      const { data } = await api.get<Job[]>('/jobs/my-jobs');
      return data;
    },
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData: CreateJobInput) => {
      const { data } = await api.post<Job>('/jobs', jobData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'my-jobs'] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateJobInput }) => {
      const { data: updatedJob } = await api.put<Job>(`/jobs/${id}`, data);
      return updatedJob;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'my-jobs'] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'my-jobs'] });
    },
  });
};
