'use client';

import { useAllUsers, useAdminDeleteUser } from '@/hooks/useAdmin';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function AdminUsersPage() {
  const { data: users, isLoading, error } = useAllUsers();
  const { mutate: deleteUser } = useAdminDeleteUser();

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteUser(userId);
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
        Failed to load users. Please try again later.
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-headline-md font-headline-md text-[#e5e2e1] mb-2">No Users Found</h2>
        <p className="text-[#cac3d9]">There are no users in the system yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg">
      <h1 className="text-headline-lg font-headline-lg text-[#e5e2e1]">Manage Users</h1>

      <div className="space-y-stack-md">
        {users.map((user) => (
          <Card key={user._id}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#494456]/20 flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-headline-md text-[#e5e2e1]">{user.name}</h3>
                    <p className="text-[#cac3d9]">{user.email}</p>
                    {user.companyName && (
                      <p className="text-[#948ea2] mt-1"><span className="font-semibold text-[#cac3d9]">Company:</span> {user.companyName}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="info" className="capitalize px-3 py-1">
                    {user.role}
                  </Badge>
                  {user.role === 'company' && (
                    <Badge variant={user.isApproved ? 'success' : 'warning'} className="px-3 py-1">
                      {user.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-sm text-[#948ea2] mb-6 pt-4 border-t border-[#494456]/10">
                <p>
                  <span className="font-semibold text-[#cac3d9]">Joined:</span> {formatDate(user.createdAt)}
                </p>
              </div>

              <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)} className="font-label-sm">
                <span className="material-symbols-outlined mr-2 text-[18px]">delete</span> Delete User
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
