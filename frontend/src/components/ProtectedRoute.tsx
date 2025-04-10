import { JSX, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

interface ProtectedRouteProp {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProp) {
  const { user, isLoading, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    console.log(user)
  }, [user, fetchUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
          <p className="text-green-700 text-lg font-semibold">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.isAdmin) {
    if (location.pathname !== '/adminDashboard') {
      return <Navigate to="/adminDashboard" replace />;
    }
  }

  if (!user.isAdmin && !user.isWhitelisted) {
    if (location.pathname !== '/whitelist') {
      return <Navigate to="/whitelist" replace />;
    }
  }

  if (!user.isAdmin && user.isWhitelisted) {
    if (location.pathname !== '/home') {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
}