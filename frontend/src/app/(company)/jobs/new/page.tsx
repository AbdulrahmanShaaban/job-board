'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobSchema } from '@/lib/validators';
import { useCreateJob } from '@/hooks/useJobs';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function NewJobPage() {
  const { mutate: createJob, isPending } = useCreateJob();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createJob(data);
      router.push('/my-jobs');
    } catch (error: any) {
      console.error('Failed to create job:', error.message);
    }
  };

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
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Post a New Job</h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-stack-md">
          <Input
            label="Job Title"
            {...register('title')}
            error={errors.title?.message as string}
          />

          <div>
            <label className="block text-sm font-semibold tracking-wider text-[#e5e2e1] mb-2">
              Job Description
            </label>
            <textarea
              {...register('description')}
              rows={8}
              className={`w-full px-4 py-3 input-bg text-[#e5e2e1] placeholder:text-[#cac3d9]/50 border rounded-[24px] focus:outline-none transition-colors resize-none ${errors.description ? 'border-[#ffb4ab]' : 'border-transparent input-focus'}`}
              placeholder="Describe the role, responsibilities, and requirements..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-[#ffb4ab]">{errors.description.message as string}</p>
            )}
          </div>

          <Input
            label="Location"
            {...register('location')}
            error={errors.location?.message as string}
          />

          <Select
            label="Job Type"
            options={typeOptions}
            {...register('type')}
            error={errors.type?.message as string}
          />

          <Select
            label="Category"
            options={categoryOptions}
            {...register('category')}
            error={errors.category?.message as string}
          />

          <Input
            label="Salary (optional)"
            {...register('salary')}
            error={errors.salary?.message as string}
          />

          <Input
            label="Application Deadline (optional)"
            type="date"
            {...register('deadline')}
            error={errors.deadline?.message as string}
          />

          <div className="flex gap-3 justify-end pt-6 border-t border-[#494456]/10 mt-6">
            <Button variant="secondary" onClick={() => router.back()} type="button">
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending} className="px-8">
              Post Job
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
