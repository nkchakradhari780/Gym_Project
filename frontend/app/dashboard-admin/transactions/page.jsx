'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionsPage() {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionsList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/transections', {
          withCredentials: true,
        });
        console.log('Transactions List', response.data.transections);
        if (response.data.transections) {
          setTransactionsList(response.data.transections);
        } else {
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error Fetching Transactions List:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionsList();
  }, []);

  if (loading) return <div className="text-white p-4">Loading transactions...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-950 min-h-[75vh] text-white mt-5">
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-800">
        <table className="min-w-full text-sm text-left bg-gray-900 text-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionsList.length > 0 ? (
              transactionsList.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2">{transaction.costumer?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{transaction._id}</td>
                  <td className="px-4 py-2">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{transaction.amount}</td>
                  <td className="px-4 py-2 capitalize">{transaction.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed'
                          ? 'bg-green-600'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No Transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
