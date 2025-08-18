'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasPermission, UserRole } from '@/lib/auth';
import { LoadingPage } from '@/components/ui/loading';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: (keyof import('@/lib/auth').Permission)[];
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function AuthGuard({ 
  children, 
  requiredPermissions = [], 
  allowedRoles = [],
  fallback = <div>Access Denied</div>
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role as UserRole)) {
      return;
    }

    // Check if user has required permissions
    for (const permission of requiredPermissions) {
      if (!hasPermission(session.user.role as UserRole, permission)) {
        return;
      }
    }
  }, [session, status, router, allowedRoles, requiredPermissions]);

  // Show loading state during initial load or when not yet client-side
  if (status === 'loading' || !isClient) {
    return <LoadingPage text="Loading authentication..." />;
  }

  if (!session) {
    return <LoadingPage text="Redirecting to sign in..." />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role as UserRole)) {
    return fallback;
  }

  // Check if user has required permissions
  for (const permission of requiredPermissions) {
    if (!hasPermission(session.user.role as UserRole, permission)) {
      return fallback;
    }
  }

  return <>{children}</>;
}

export function ClientOnlyGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (status === 'loading' || !isClient) {
    return <LoadingPage text="Loading..." />;
  }
  
  if (!session || !['full_access', 'it_admin', 'end_user'].includes(session.user.role)) {
    return <div>Access Denied - Client access only</div>;
  }

  return <>{children}</>;
}

export function RyujinOnlyGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (status === 'loading' || !isClient) {
    return <LoadingPage text="Loading..." />;
  }
  
  if (!session || !['ryujin_admin', 'ryujin_support'].includes(session.user.role)) {
    return <div>Access Denied - Ryujin access only</div>;
  }

  return <>{children}</>;
} 