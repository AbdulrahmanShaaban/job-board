'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validators';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

import { Suspense } from 'react';

function LoginContent() {
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const error = searchParams.get('error');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      router.push(redirect);
    } catch (error: any) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <>
      <div className="text-center mb-stack-lg">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-stack-sm tracking-tight">
          JobBoard
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Sign in to your high-performance console.
        </p>
      </div>

      {error === 'not_approved' && (
        <div className="mb-stack-lg p-4 bg-[#efc20a]/10 border border-[#efc20a]/30 text-[#efc20a] rounded-[24px] text-sm">
          Your company account is pending approval from an administrator.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-gutter">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-[38px] text-on-surface-variant z-10 pointer-events-none">mail</span>
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            {...register('email')}
            error={errors.email?.message as string}
            className="pl-[48px]"
          />
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-[38px] text-on-surface-variant z-10 pointer-events-none">lock</span>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message as string}
            className="pl-[48px]"
          />
        </div>

        <Button type="submit" className="w-full mt-stack-md" isLoading={isLoggingIn} size="lg">
          Sign In <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
        </Button>
      </form>

      <div className="mt-stack-lg text-center">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:text-primary-fixed-dim font-label-md transition-colors ml-1">
            Register now
          </Link>
        </p>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center relative overflow-hidden -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-[480px] bg-level-1 rounded-[24px] p-stack-lg md:p-[40px] shadow-2xl relative z-10">
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
