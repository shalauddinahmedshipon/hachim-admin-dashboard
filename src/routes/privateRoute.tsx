import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { accessToken, user } = useAuthStore();

  if (!accessToken || user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
