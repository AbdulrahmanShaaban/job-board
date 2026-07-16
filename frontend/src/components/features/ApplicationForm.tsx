'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createApplicationSchema } from '@/lib/validators';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useCreateApplication } from '@/hooks/useApplications';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

const ApplicationForm = ({ isOpen, onClose, jobId, jobTitle }: ApplicationFormProps) => {
  const { mutate: createApplication, isPending } = useCreateApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createApplicationSchema),
  });

  const onSubmit = (data: any) => {
    createApplication(
      { jobId, data },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply for ${jobTitle}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold tracking-wider text-[#e5e2e1] mb-2">
            Cover Letter
          </label>
          <textarea
            {...register('coverLetter')}
            rows={6}
            className={`w-full px-4 py-3 input-bg text-[#e5e2e1] placeholder:text-[#cac3d9]/50 border rounded-[24px] focus:outline-none transition-colors resize-none ${errors.coverLetter ? 'border-[#ffb4ab]' : 'border-transparent input-focus'}`}
            placeholder="Tell us why you're interested in this position..."
          />
          {errors.coverLetter && (
            <p className="mt-1 text-sm text-[#ffb4ab]">{errors.coverLetter.message as string}</p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationForm;
