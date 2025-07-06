"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/logo';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-12 w-12 animate-pulse text-primary" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
