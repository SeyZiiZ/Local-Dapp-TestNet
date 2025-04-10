import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from '@apollo/client'
import { GET_ADMIN_STATS } from '../api/admin';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/admin/Header';
import Logo from '../components/admin/Logo';
import StatsPanel from '../components/admin/StatsPanel';
import WhitelistTable from '../components/admin/WhitelistTable';
import MiniFooter from '../components/MiniFooter';

interface AdminDashboardProps {
  errorProp: string | any;
  success: string | any;
  approveWhitelist: (id: string) => void;
  rejectWhitelist: (id: string) => void;
  refreshData: () => void;
}

export default function AdminDashboard({
  errorProp,
  success,
  approveWhitelist,
  rejectWhitelist,
  refreshData
}: AdminDashboardProps) {

  const { data, refetch } = useQuery(GET_ADMIN_STATS);
  const [liveRequests, setLiveRequests] = useState<any[]>([]);


  const stats = data?.getAdminStats;
  const totalUsers = stats?.totalUsers ?? 0;
  const totalWhitelisted = stats?.totalWhitelisted ?? 0;
  const totalTransactions = stats?.totalTransactions ?? 0;
  const whitelistRequests = stats?.whitelistRequests ?? [];

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('✅ Connecté au WebSocket');
    });

    socket.on('notification', (data) => {
      console.log('📩 Notification reçue:', data);
      toast.info(`🔔 ${data.title}`);
      if (data.details) {
        setLiveRequests((prev) => [data.details, ...prev]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const allRequests = [...liveRequests, ...(whitelistRequests || [])];

  return (
    <section className="relative bg-teal-900 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        src="src/assets/fauna-assets/headers/bg-waves.png"
        alt=""
      />

      <ToastContainer position="bottom-right" autoClose={4000} />

      <Logo />

      <div className="relative w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Header />

          {errorProp && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{String(errorProp)}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              <p>{success}</p>
            </div>
          )}

          <StatsPanel
            totalUsers={totalUsers}
            totalWhitelisted={totalWhitelisted}
            totalTransactions={totalTransactions}
          />

          <WhitelistTable
            requests={allRequests}
            approveWhitelist={approveWhitelist}
            rejectWhitelist={rejectWhitelist}
          />

          <div className="mt-6 text-center">
            <button
              onClick={refreshData}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-teal-900 bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 cursor-pointer"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Update data
            </button>
          </div>
        </div>
      </div>

      <MiniFooter />
    </section>
  );
}