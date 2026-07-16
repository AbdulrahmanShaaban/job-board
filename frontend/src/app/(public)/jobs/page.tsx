'use client';

import { useSearchParams } from 'next/navigation';
import { useJobs } from '@/hooks/useJobs';
import JobCard from '@/components/features/JobCard';
import JobFilters from '@/components/features/JobFilters';

import { Suspense } from 'react';

function JobsContent() {
  const searchParams = useSearchParams();

  const params = {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') as any || undefined,
    location: searchParams.get('location') || undefined,
    type: searchParams.get('type') as any || undefined,
  };

  const { data: jobs, isLoading, error } = useJobs(params);

  return (
    <>
      <JobFilters />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-[#2a2a2a] rounded-[24px] h-64 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-[#93000a]/20 border border-[#ffb4ab]/50 text-[#ffb4ab] px-4 py-3 rounded-[24px]">
          Failed to load jobs. Please try again later.
        </div>
      ) : jobs && jobs.length > 0 ? (
        <>
          <p className="text-[#cac3d9]">{jobs.length} jobs found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-[#cac3d9]">
          No jobs found matching your criteria.
        </div>
      )}
    </>
  );
}

export default function JobsPage() {
  return (
    <div className="space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Browse Jobs</h1>
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-[#2a2a2a] rounded-[24px] h-64 animate-pulse" />
          ))}
        </div>
      }>
        <JobsContent />
      </Suspense>
    </div>
  );
}
