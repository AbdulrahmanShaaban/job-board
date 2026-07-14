import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Application, CreateApplicationInput, UpdateApplicationStatusInput } from '@/types/application';

export const useMyApplications = () => {
  return useQuery<Application[]>({
    queryKey: ['applications', 'my-apps'],
    queryFn: async () => {
      const { data } = await api.get<Application[]>('/applications/my-apps');
      return data;
    },
  });
};

export const useJobApplications = (jobId: string) => {
  return useQuery<Application[]>({
    queryKey: ['applications', 'job', jobId],
    queryFn: async () => {
      const { data } = await api.get<Application[]>(`/applications/job/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, data }: { jobId: string; data: CreateApplicationInput }) => {
      const response = await api.post<Application>(`/applications/${jobId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', 'my-apps'] });
      queryClient.invalidateQueries({ queryKey: ['applications', 'job'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateApplicationStatusInput }) => {
      const response = await api.put<Application>(`/applications/${id}/status`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', 'job'] });
      queryClient.invalidateQueries({ queryKey: ['applications', 'my-apps'] });
    },
  });
};
