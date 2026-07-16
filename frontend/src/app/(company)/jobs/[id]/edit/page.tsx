'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateJobSchema } from '@/lib/validators';
import { useJob } from '@/hooks/useJobs';
import { useUpdateJob } from '@/hooks/useJobs';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const { data: job, isLoading } = useJob(params.id as string);
  const { mutate: updateJob, isPending } = useUpdateJob();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateJobSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await updateJob({ id: params.id as string, data });
      router.push('/my-jobs');
    } catch (error: any) {
      console.error('Failed to update job:', error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-stack-md">
        <div className="bg-[#2a2a2a] rounded-[24px] h-96 animate-pulse" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-[#93000a]/20 border border-[#ffb4ab]/50 text-[#ffb4ab] px-4 py-3 rounded-[24px]">
        Failed to load job details.
      </div>
    );
  }

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'other', label: 'Other' },
  ];

  const typeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Edit Job</h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-stack-md">
          <Input
            label="Job Title"
            defaultValue={job.title}
            {...register('title')}
            error={errors.title?.message as string}
          />

          <div>
            <label className="block text-sm font-semibold tracking-wider text-[#e5e2e1] mb-2">
              Job Description
            </label>
            <textarea
              {...register('description')}
              defaultValue={job.description}
              rows={8}
              className={`w-full px-4 py-3 input-bg text-[#e5e2e1] border rounded-[24px] focus:outline-none transition-colors resize-none ${errors.description ? 'border-[#ffb4ab]' : 'border-transparent input-focus'}`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-[#ffb4ab]">{errors.description.message as string}</p>
            )}
          </div>

          <Input
            label="Location"
            defaultValue={job.location}
            {...register('location')}
            error={errors.location?.message as string}
          />

          <Select
            label="Job Type"
            options={typeOptions}
            defaultValue={job.type}
            {...register('type')}
            error={errors.type?.message as string}
          />

          <Select
            label="Category"
            options={categoryOptions}
            defaultValue={job.category}
            {...register('category')}
            error={errors.category?.message as string}
          />

          <Input
            label="Salary (optional)"
            defaultValue={job.salary || ''}
            {...register('salary')}
            error={errors.salary?.message as string}
          />

          <Input
            label="Application Deadline (optional)"
            type="date"
            defaultValue={job.deadline ? job.deadline.split('T')[0] : ''}
            {...register('deadline')}
            error={errors.deadline?.message as string}
          />

          <div className="flex gap-3 justify-end pt-6 border-t border-[#494456]/10 mt-6">
            <Button variant="secondary" onClick={() => router.back()} type="button">
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending} className="px-8">
              Update Job
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
