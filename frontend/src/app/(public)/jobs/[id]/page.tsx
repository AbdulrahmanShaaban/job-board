'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJob } from '@/hooks/useJobs';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import JobCard from '@/components/features/JobCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ApplicationForm from '@/components/features/ApplicationForm';
import Card from '@/components/ui/Card';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, role } = useAuth();
  const { data: job, isLoading, error } = useJob(params.id as string);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#2a2a2a] rounded-[24px] h-64 animate-pulse" />
          <div className="bg-[#2a2a2a] rounded-[24px] h-96 animate-pulse" />
        </div>
        <div className="space-y-6">
          <div className="bg-[#2a2a2a] rounded-[24px] h-64 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-[#5d1a1a] border border-[#ff4d4d] text-[#ffb3b3] px-4 py-3 rounded-[24px]">
        Failed to load job details. The job may not exist.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const canApply = isAuthenticated && role === 'applicant';

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <span className="material-symbols-outlined mr-2">arrow_back</span> Back to Jobs
      </Button>

      <Card>
        <div className="p-8">
          <div className="flex justify-between items-start mb-stack-lg border-b border-[#494456]/10 pb-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-3xl">domain</span>
              </div>
              <div>
                <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1] mb-2">{job.title}</h1>
                <p className="text-body-lg text-[#cac3d9]">{job.company.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="info" className="capitalize px-4 py-2 text-label-sm">
                {job.type}
              </Badge>
              <Badge variant="default" className="capitalize px-4 py-2">
                {job.category}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-stack-lg">
            <div className="input-bg p-4 rounded-[24px] border border-[#494456]/10">
              <p className="text-label-sm font-label-sm text-[#948ea2] uppercase tracking-wider mb-1">Location</p>
              <p className="font-body-md text-[#e5e2e1]">{job.location}</p>
            </div>
            {job.salary && (
              <div className="input-bg p-4 rounded-[24px] border border-[#494456]/10">
                <p className="text-label-sm font-label-sm text-[#948ea2] uppercase tracking-wider mb-1">Salary</p>
                <p className="font-body-md text-[#e5e2e1]">{job.salary}</p>
              </div>
            )}
            {job.deadline && (
              <div className="input-bg p-4 rounded-[24px] border border-[#494456]/10">
                <p className="text-label-sm font-label-sm text-[#948ea2] uppercase tracking-wider mb-1">Deadline</p>
                <p className="font-body-md text-[#e5e2e1]">{formatDate(job.deadline)}</p>
              </div>
            )}
            <div className="input-bg p-4 rounded-[24px] border border-[#494456]/10">
              <p className="text-label-sm font-label-sm text-[#948ea2] uppercase tracking-wider mb-1">Posted</p>
              <p className="font-body-md text-[#e5e2e1]">{formatDate(job.createdAt)}</p>
            </div>
          </div>

          <div className="mb-stack-lg">
            <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-4">Job Description</h2>
            <div className="prose prose-invert max-w-none text-[#cac3d9] whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </div>

          <div className="pt-6 border-t border-[#494456]/10">
            {canApply && (
              <Button size="lg" onClick={() => setIsApplicationFormOpen(true)} className="px-10">
                Apply Now
              </Button>
            )}

            {!isAuthenticated && (
              <div className="bg-[#6633ee]/10 border border-[#6633ee]/30 text-[#ccbeff] px-4 py-4 rounded-[24px] inline-block">
                Please <a href="/login" className="underline hover:text-white font-semibold">log in</a> as an applicant to apply for this job.
              </div>
            )}

            {isAuthenticated && role !== 'applicant' && (
              <div className="bg-[#efc20a]/10 border border-[#efc20a]/30 text-[#efc20a] px-4 py-4 rounded-[24px] inline-block">
                Only applicants can apply for jobs.
              </div>
            )}
          </div>
        </div>
      </Card>

      <ApplicationForm
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        jobId={job._id}
        jobTitle={job.title}
      />
    </div>
  );
}
