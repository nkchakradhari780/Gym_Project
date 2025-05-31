'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './transactions.module.css';

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionsList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/transections',
          { withCredentials: true }
        );
        if (response.data.transections) {
          console.log("Response Data Transections:",response.data.transections)
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
    return <div className={styles.loading}>Loading transactions...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList.length > 0 ? (
            transactionsList.map((transaction) => (
              <tr key={transaction._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={transaction.avatar || '/images/noavtar.png'} // Use a default avatar if none is provided
                      alt={transaction.name || 'User'}
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {transaction.costumer.fullName || 'Anonymous'}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      transaction.status.toLowerCase()
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </td>
                <td>{transaction.amount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
