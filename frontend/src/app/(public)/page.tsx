'use client';

import { useJobs } from '@/hooks/useJobs';
import JobCard from '@/components/features/JobCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: jobs, isLoading, error } = useJobs();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const featuredJobs = jobs?.slice(0, 6);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <>
      <div className="flex-grow flex flex-col gap-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 relative overflow-hidden rounded-[24px] bg-surface-container-lowest border border-outline-variant/10 shadow-[0_0_40px_rgba(102,51,238,0.05)]">
          {/* Decorative Background Element */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, #6633ee 0%, transparent 70%)' }}></div>
          <div className="relative z-10 flex flex-col gap-stack-lg max-w-3xl px-6">
            <h1 className="text-headline-xl font-headline-xl md:text-headline-xl text-on-background">
              Find your next <span className="text-primary-container inline-block drop-shadow-[0_0_15px_rgba(102,51,238,0.3)]">electric</span> career.
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Connect with forward-thinking companies. High-impact roles for tech-savvy professionals.
            </p>

            {/* Search Bar */}
            <div className="input-bg rounded-full p-2 flex flex-col md:flex-row items-center w-full max-w-2xl mx-auto border border-outline-variant/20 focus-within:border-primary-container focus-within:shadow-[0_0_15px_rgba(102,51,238,0.2)] transition-all duration-300">
              <div className="flex-grow flex items-center px-4 py-2 md:py-0 w-full md:w-auto border-b md:border-b-0 md:border-r border-outline-variant/20">
                <span className="material-symbols-outlined text-outline mr-3">search</span>
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  className="bg-transparent border-none outline-none text-on-background placeholder:text-[#cac3d9]/50 font-body-md w-full h-[40px] focus:ring-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-grow flex items-center px-4 py-2 md:py-0 w-full md:w-auto">
                <span className="material-symbols-outlined text-outline mr-3">location_on</span>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="bg-transparent border-none outline-none text-on-background placeholder:text-[#cac3d9]/50 font-body-md w-full h-[40px] focus:ring-0"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary-container text-white px-8 py-3 rounded-full font-label-md text-label-md glow-effect transition-all duration-200 w-full md:w-auto mt-2 md:mt-0 flex-shrink-0"
              >
                Search Jobs
              </button>
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
              <span className="text-label-sm font-label-sm text-outline">Popular:</span>
              <Link href="/jobs?search=Frontend" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full border border-outline-variant/20 hover:border-primary/50 transition-colors">Frontend Developer</Link>
              <Link href="/jobs?search=Designer" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full border border-outline-variant/20 hover:border-primary/50 transition-colors">Product Designer</Link>
              <Link href="/jobs?search=Data" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full border border-outline-variant/20 hover:border-primary/50 transition-colors">Data Scientist</Link>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="flex flex-col gap-stack-lg">
          <div className="flex justify-between items-end">
            <h2 className="text-headline-md font-headline-md text-on-background">Featured Opportunities</h2>
            <Link href="/jobs" className="text-label-md font-label-md text-primary hover:text-primary-fixed transition-colors flex items-center gap-1">
              View all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-surface-container-high rounded-[24px] h-64 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="bg-error-container/20 border border-error/50 text-error px-4 py-3 rounded-[24px]">
              Failed to load jobs. Please try again later.
            </div>
          ) : featuredJobs && featuredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {featuredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-variant">
              No jobs available at the moment.
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-outline-variant/10 mt-auto pt-8 pb-8 -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-container-max mx-auto gap-stack-md md:gap-0">
          <div className="text-label-md font-label-md font-bold text-primary">
            JobBoard
          </div>
          <div className="flex flex-wrap justify-center gap-gutter">
            <a href="#" className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-opacity">Cookie Policy</a>
            <a href="#" className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary-fixed-dim opacity-80 hover:opacity-100 transition-opacity">Contact Us</a>
          </div>
          <div className="text-label-sm font-label-sm text-on-surface-variant">
            © 2026 JobBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
