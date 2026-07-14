'use client';

import { useMyJobs } from '@/hooks/useJobs';
import { useDeleteJob } from '@/hooks/useJobs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function MyJobsPage() {
  const { data: jobs, isLoading, error } = useMyJobs();
  const { mutate: deleteJob } = useDeleteJob();
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-stack-md">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#2a2a2a] rounded-[24px] h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#93000a]/20 border border-[#ffb4ab]/50 text-[#ffb4ab] px-4 py-3 rounded-[24px]">
        Failed to load jobs. Please try again later.
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-2">No Jobs Posted Yet</h2>
        <p className="text-[#cac3d9] mb-6">Start posting jobs to find the perfect candidates.</p>
        <Link href="/jobs/new">
          <Button size="lg" className="px-8 font-label-md">Post Your First Job</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">My Jobs</h1>
        <Link href="/jobs/new">
          <Button className="font-label-md px-6">
            <span className="material-symbols-outlined mr-2 text-[20px]">add</span> Post New Job
          </Button>
        </Link>
      </div>

      <div className="space-y-stack-md">
        {jobs.map((job) => (
          <Card key={job._id}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white">work_outline</span>
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-headline-md text-[#e5e2e1]">{job.title}</h3>
                    <p className="text-[#cac3d9]">{job.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="info" className="capitalize px-3 py-1">
                    {job.type}
                  </Badge>
                  <Badge variant="default" className="capitalize px-3 py-1">
                    {job.category}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-4 text-sm text-[#948ea2] mb-6 pt-4 border-t border-[#494456]/10">
                <p>
                  <span className="font-semibold text-[#cac3d9]">Posted:</span> {formatDate(job.createdAt)}
                </p>
                {job.deadline && (
                  <p>
                    <span className="font-semibold text-[#cac3d9]">Deadline:</span> {formatDate(job.deadline)}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Link href={`/jobs/${job._id}/edit`}>
                  <Button variant="secondary" size="sm" className="font-label-sm">Edit</Button>
                </Link>
                <Link href={`/jobs/${job._id}/applications`}>
                  <Button variant="secondary" size="sm" className="font-label-sm">View Applications</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(job._id)} className="font-label-sm">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
