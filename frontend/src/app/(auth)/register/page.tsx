'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validators';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function RegisterPage() {
  const { register: registerUser, isRegistering } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const role = watch('role');

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      router.push('/login?registered=true');
    } catch (error: any) {
      console.error('Registration failed:', error.message);
    }
  };

  const roleOptions = [
    { value: 'applicant', label: 'Applicant' },
    { value: 'company', label: 'Company' },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center relative overflow-hidden -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop py-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-[480px] bg-level-1 rounded-[24px] p-stack-lg md:p-[40px] shadow-2xl relative z-10">
        <div className="text-center mb-stack-lg">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-stack-sm tracking-tight">
            Create Account
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Join JobBoard today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-gutter">
          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message as string}
          />

          <Input
            label="Email Address"
            type="email"
            {...register('email')}
            error={errors.email?.message as string}
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message as string}
          />

          <Select
            label="I am a"
            options={roleOptions}
            {...register('role')}
            error={errors.role?.message as string}
          />

          {role === 'company' && (
            <Input
              label="Company Name"
              {...register('companyName')}
              error={errors.companyName?.message as string}
            />
          )}

          <Button type="submit" className="w-full mt-stack-md" isLoading={isRegistering} size="lg">
            Create Account <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
          </Button>
        </form>

        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary-fixed-dim font-label-md transition-colors ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
