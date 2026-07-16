import Badge from '@/components/ui/Badge';
import { ApplicationStatus } from '@/types/application';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
  const statusConfig = {
    pending: { variant: 'warning' as const, label: 'Pending' },
    accepted: { variant: 'success' as const, label: 'Accepted' },
    rejected: { variant: 'danger' as const, label: 'Rejected' },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default ApplicationStatusBadge;
