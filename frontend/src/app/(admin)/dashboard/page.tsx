'use client';

import { useAdminStats } from '@/hooks/useAdmin';
import Card from '@/components/ui/Card';

export default function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#2a2a2a] rounded-[24px] h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#93000a]/20 border border-[#ffb4ab]/50 text-[#ffb4ab] px-4 py-3 rounded-[24px]">
        Failed to load admin stats. Please try again later.
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-[#cac3d9]">
        No statistics available.
      </div>
    );
  }

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, color: 'primary', icon: 'group' },
    { title: 'Total Jobs', value: stats.totalJobs, color: 'success', icon: 'work' },
    { title: 'Total Applications', value: stats.totalApplications, color: 'info', icon: 'description' },
    { title: 'Pending Companies', value: stats.pendingCompanies, color: 'warning', icon: 'domain' },
  ];

  const colorClasses = {
    primary: 'bg-[#6633ee] text-white',
    success: 'bg-[#4ae183] text-[#111111]',
    info: 'bg-[#ccbeff] text-[#111111]',
    warning: 'bg-[#efc20a] text-[#111111]',
  };

  return (
    <div className="space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <div className="p-6">
              <div className={`${colorClasses[stat.color as keyof typeof colorClasses]} rounded-[16px] p-4 mb-4 flex items-center justify-between`}>
                <span className="material-symbols-outlined text-[32px] opacity-80">{stat.icon}</span>
                <p className="text-headline-md font-headline-md">{stat.value}</p>
              </div>
              <p className="text-label-md font-label-md text-[#cac3d9] uppercase tracking-wider">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <Card>
          <div className="p-8">
            <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <a
                href="/admin/companies/pending"
                className="block p-4 input-bg border border-[#494456]/10 rounded-[24px] hover:border-[#6633ee]/50 transition-colors group"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-headline-sm text-[#e5e2e1] group-hover:text-[#ccbeff] transition-colors">Review Pending Companies</p>
                  <span className="material-symbols-outlined text-[#6633ee] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </div>
                <p className="text-body-sm text-[#948ea2]">Approve or reject company registrations</p>
              </a>
              <a
                href="/admin/users"
                className="block p-4 input-bg border border-[#494456]/10 rounded-[24px] hover:border-[#6633ee]/50 transition-colors group"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-headline-sm text-[#e5e2e1] group-hover:text-[#ccbeff] transition-colors">Manage Users</p>
                  <span className="material-symbols-outlined text-[#6633ee] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </div>
                <p className="text-body-sm text-[#948ea2]">View and manage all users</p>
              </a>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-8">
            <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-6">System Overview</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#494456]/10">
                <span className="text-[#cac3d9]">User Registration Rate</span>
                <span className="font-label-md text-[#4ae183] flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span> Active</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#494456]/10">
                <span className="text-[#cac3d9]">Job Posting Rate</span>
                <span className="font-label-md text-[#4ae183] flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#cac3d9]">Application Activity</span>
                <span className="font-label-md text-[#4ae183] flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span> Active</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
