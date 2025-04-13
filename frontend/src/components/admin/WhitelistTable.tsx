interface Request {
  address: string;
  timestamp: string;
  status: string | boolean;
  id: string;
  _id?: string;
  wallet?: string;
  createdAt?: string;
}

interface WhitelistTableProps {
  requests: Request[];
  approveWhitelist: (id: string, decision: string) => void;
  rejectWhitelist: (id: string, decision: string) => void;
}

export default function WhitelistTable({ requests, approveWhitelist, rejectWhitelist }: WhitelistTableProps) {
    console.log(requests);
  return (
    <div className="mb-8">
      <h3 className="flex items-center text-lg font-medium text-gray-700 mb-4">
        <svg className="h-5 w-5 mr-2 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        Latest whitelist requests
      </h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={request._id || request.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(request.wallet || request.address)?.substring(0, 6)}...{(request.wallet || request.address)?.substring((request.wallet || request.address).length - 4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt || request.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${request.status === false || request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        request.status === 'true' || request.status === true ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}>
                      {request.status === false || request.status === "pending" ? 'En attente' : 
                        request.status === 'true' || request.status === true  ? 'Approuvé' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(request.status === false || request.status === 'pending' || request.status === 'false') && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => approveWhitelist(request._id || request.id, "accepted")}
                          className="px-3 py-1 bg-lime-500 text-teal-900 rounded-full hover:bg-lime-600 transition-colors duration-200 cursor-pointer"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => rejectWhitelist(request._id || request.id, "refused")}
                          className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No pending whitelist requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}