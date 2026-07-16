'use client';

import { useMyApplications } from '@/hooks/useApplications';
import ApplicationStatusBadge from '@/components/features/ApplicationStatusBadge';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function MyApplicationsPage() {
  const { data: applications, isLoading, error } = useMyApplications();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
        Failed to load applications. Please try again later.
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-2">No Applications Yet</h2>
        <p className="text-[#cac3d9] mb-6">Start applying for jobs to track your applications here.</p>
        <Link href="/jobs">
          <button className="bg-[#6633ee] text-white px-8 py-3 rounded-full hover:brightness-110 glow-effect transition-all font-label-md">
            Browse Jobs
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">My Applications</h1>

      <div className="space-y-stack-md">
        {applications.map((application) => (
          <Link key={application._id} href={`/jobs/${application.job._id}`}>
            <Card hover>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white">work</span>
                    </div>
                    <div>
                      <h3 className="text-headline-sm font-headline-md text-[#e5e2e1] group-hover:text-[#ccbeff] transition-colors">{application.job.title}</h3>
                      <p className="text-[#cac3d9]">{application.job.company.name}</p>
                    </div>
                  </div>
                  <ApplicationStatusBadge status={application.status} />
                </div>

                <div className="space-y-2 text-sm text-[#948ea2] mt-4 pt-4 border-t border-[#494456]/10">
                  <p>
                    <span className="font-semibold text-[#cac3d9]">Applied on:</span> {formatDate(application.createdAt)}
                  </p>
                  <p className="line-clamp-2">
                    <span className="font-semibold text-[#cac3d9]">Cover Letter:</span> {application.coverLetter}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
