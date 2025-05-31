'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/my-plan/my-plan.module.css';
import axios from 'axios';

const PlanListPage = () => {
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:3001/customer/purchesedPlans', {
          withCredentials: true,
        });

        console.log(response.data);

        if (response.data?.length > 0) {
          setPurchasedPlans(response.data);
        } else {
          setError('No purchased plans available.');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.plansContainer}>
      <h3 className={styles.planTitle}>All Purchased Plans</h3>
      <div className={styles.card}>
        {purchasedPlans.map((plan, index) => (
          <div key={index} className={styles.planDetails}>
            <p><strong>Name:</strong> {plan.planName}</p>
            <p><strong>Facilities:</strong> {plan.facilities?.join(', ') || 'Not provided'}</p>
            <p><strong>Duration:</strong> {plan.duration || 'Not specified'}</p>
            <p><strong>Level:</strong> {plan.level || 'Not specified'}</p>
            <p><strong>Category:</strong> {plan.category || 'Not specified'}</p>
            <p><strong>Price:</strong> ${plan.price || 'Not specified'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanListPage;
