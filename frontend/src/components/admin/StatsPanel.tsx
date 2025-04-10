interface StatsPanelProps {
  totalUsers: number;
  totalWhitelisted: number;
  totalTransactions: number;
}

export default function StatsPanel({ totalUsers, totalWhitelisted, totalTransactions }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="p-6 bg-teal-50 rounded-xl text-center">
        <h3 className="text-gray-700 mb-2">Registered users</h3>
        <p className="text-3xl font-bold text-teal-600">{totalUsers}</p>
      </div>
      <div className="p-6 bg-lime-50 rounded-xl text-center">
        <h3 className="text-gray-700 mb-2">Whitelisted users</h3>
        <p className="text-3xl font-bold text-lime-600">{totalWhitelisted}</p>
      </div>
      <div className="p-6 bg-indigo-50 rounded-xl text-center">
        <h3 className="text-gray-700 mb-2">Total transactions</h3>
        <p className="text-3xl font-bold text-indigo-600">{totalTransactions}</p>
      </div>
    </div>
  );
}