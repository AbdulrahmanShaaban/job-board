'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const Navbar = () => {
  const { user, isAuthenticated, role, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-[#131313]/80 backdrop-blur-md border-b border-[#494456]/10 sticky top-0 z-40 h-20 w-full">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="text-headline-md font-headline-md font-extrabold text-[#ccbeff]">
            JobBoard
          </Link>

          <div className="flex items-center gap-stack-md">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <div className="hidden md:flex items-center gap-gutter mr-4">
                      <Link href="/jobs" className="text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                        Browse Jobs
                      </Link>
                      {role === 'applicant' && (
                        <Link href="/my-applications" className="text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                          My Applications
                        </Link>
                      )}
                      {role === 'company' && (
                        <>
                          <Link href="/my-jobs" className="text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                            My Jobs
                          </Link>
                          <Link href="/jobs/new" className="text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                            Post Job
                          </Link>
                        </>
                      )}
                      {role === 'admin' && (
                        <Link href="/admin/dashboard" className="text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#494456]/20 flex items-center justify-center text-[#e5e2e1] font-semibold text-sm">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="hidden md:inline text-sm text-[#cac3d9]">Hi, {user?.name}</span>
                      <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:flex items-center gap-gutter mr-4">
                      <Link href="/jobs" className="text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                        Browse Jobs
                      </Link>
                    </div>
                    <Link href="/login" className="hidden md:block text-[#cac3d9] hover:text-[#ccbeff] font-label-md text-sm tracking-wider transition-colors">
                      Sign In
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="hidden md:inline-flex px-6 rounded-full font-label-md">Get Started</Button>
                    </Link>
                    
                    {/* Mobile Icons */}
                    <button className="md:hidden text-[#cac3d9] hover:text-[#ccbeff] transition-colors">
                      <span className="material-symbols-outlined">menu</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
