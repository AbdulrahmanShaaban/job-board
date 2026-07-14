'use client';

import { useParams } from 'next/navigation';
import { useJobApplications } from '@/hooks/useApplications';
import { useUpdateApplicationStatus } from '@/hooks/useApplications';
import ApplicationStatusBadge from '@/components/features/ApplicationStatusBadge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

export default function JobApplicationsPage() {
  const params = useParams();
  const { data: applications, isLoading, error } = useJobApplications(params.id as string);
  const { mutate: updateStatus } = useUpdateApplicationStatus();

  const handleStatusChange = (applicationId: string, status: string) => {
    updateStatus({ id: applicationId, data: { status: status as any } });
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-stack-md">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#2a2a2a] rounded-[24px] h-40 animate-pulse" />
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
        <p className="text-[#cac3d9]">Applications for this job will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Job Applications</h1>

      <div className="space-y-stack-md">
        {applications.map((application) => (
          <Card key={application._id}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6 border-b border-[#494456]/10 pb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    {application.applicant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-headline-md text-[#e5e2e1]">{application.applicant.name}</h3>
                    <p className="text-[#cac3d9]">{application.applicant.email}</p>
                  </div>
                </div>
                <ApplicationStatusBadge status={application.status} />
              </div>

              <div className="mb-6 input-bg p-4 rounded-[24px] border border-[#494456]/10">
                <h4 className="font-semibold tracking-wider text-[#e5e2e1] mb-2">Cover Letter</h4>
                <p className="text-[#cac3d9] whitespace-pre-line leading-relaxed">{application.coverLetter}</p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <span className="text-label-sm font-label-sm text-[#948ea2]">Update Status:</span>
                <Select
                  options={statusOptions}
                  value={application.status}
                  onChange={(e) => handleStatusChange(application._id, e.target.value)}
                  className="w-48"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
