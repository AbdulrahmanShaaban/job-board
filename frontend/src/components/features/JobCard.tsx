import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/jobs/${job._id}`}>
      <Card hover className="h-full flex flex-col gap-stack-md group">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white">code</span>
          </div>
          <Badge variant="info" className="capitalize px-3 py-1 text-label-sm">
            {job.type}
          </Badge>
        </div>

        <div>
          <h3 className="text-headline-sm font-headline-md text-[#e5e2e1] group-hover:text-[#ccbeff] transition-colors line-clamp-1">{job.title}</h3>
          <p className="text-body-md font-body-md text-[#cac3d9] mt-1">{job.company.name}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="text-label-sm font-label-sm text-[#948ea2] border border-[#494456]/20 px-2 py-1 rounded-md capitalize">
            {job.category}
          </span>
          <span className="text-label-sm font-label-sm text-[#948ea2] border border-[#494456]/20 px-2 py-1 rounded-md">
            {job.location}
          </span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#494456]/10 mt-4">
          {job.salary ? (
            <span className="text-label-md font-label-md text-[#e5e2e1]">{job.salary}</span>
          ) : (
            <span className="text-label-md font-label-md text-[#e5e2e1]">—</span>
          )}
          {job.deadline && (
            <span className="text-label-sm font-label-sm text-[#948ea2]">{formatDate(job.deadline)}</span>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default JobCard;
