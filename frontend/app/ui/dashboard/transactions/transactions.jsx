'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionsList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/transections', {
          withCredentials: true,
        });
        if (response.data.transections) {
          setTransactionsList(response.data.transections);
        } else {
          setError('No data returned from API');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionsList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300 bg-[#111827]">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400 bg-[#111827]">
        Error: {error}
      </div>
    );
  }

  return (
    <div className=" bg-[#111827] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Latest Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto border-collapse rounded-md">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsList.length > 0 ? (
                  transactionsList.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="border-t border-gray-700 hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <Image
                          src={transaction.avatar || '/images/noavtar.png'}
                          alt={transaction.costumer?.fullName || 'User'}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <span>{transaction.costumer?.fullName || 'Anonymous'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status.toLowerCase() === 'success'
                              ? 'bg-green-600 text-white'
                              : transaction.status.toLowerCase() === 'pending'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(transaction.transactionDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">₹{transaction.amount.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No Transactions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
