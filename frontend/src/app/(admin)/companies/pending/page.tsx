'use client';

import { usePendingCompanies, useApproveCompany } from '@/hooks/useAdmin';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function PendingCompaniesPage() {
  const { data: companies, isLoading, error } = usePendingCompanies();
  const { mutate: approveCompany } = useApproveCompany();

  const handleApprove = (companyId: string) => {
    if (confirm('Are you sure you want to approve this company?')) {
      approveCompany(companyId);
    }
  };

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
        Failed to load pending companies. Please try again later.
      </div>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-2">No Pending Companies</h2>
        <p className="text-[#cac3d9]">All company registrations have been processed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Pending Company Approvals</h1>

      <div className="space-y-stack-md">
        {companies.map((company) => (
          <Card key={company._id}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    <span className="material-symbols-outlined text-[20px]">domain</span>
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-headline-md text-[#e5e2e1]">{company.companyName}</h3>
                    <p className="text-[#cac3d9]">{company.name}</p>
                    <p className="text-[#cac3d9]">{company.email}</p>
                  </div>
                </div>
                <Badge variant="warning" className="px-3 py-1">Pending Approval</Badge>
              </div>

              <div className="text-sm text-[#948ea2] mb-6 pt-4 border-t border-[#494456]/10">
                <p>
                  <span className="font-semibold text-[#cac3d9]">Registered:</span> {formatDate(company.createdAt)}
                </p>
              </div>

              <Button onClick={() => handleApprove(company._id)} className="px-6 font-label-md">
                <span className="material-symbols-outlined mr-2 text-[20px]">check_circle</span> Approve Company
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
