"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsPage() {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionsList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/transections",
          { withCredentials: true }
        );
        console.log("Transactions List", response.data.transections);
        if (response.data.transections) {
          setTransactionsList(response.data.transections);
        } else {
          setError("No data returned from API");
        }
      } catch (error) {
        console.error("Error Fetching Transactions List:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionsList();
  }, []);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {transactionsList.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-950">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionsList && transactionsList.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-600">
                <td className="border border-gray-300 px-4 py-2">{transaction.costumer.fullName}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction._id}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.type}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Transactions found.</div>
      )}
    </div>
  );
}
