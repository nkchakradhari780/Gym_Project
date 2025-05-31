'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/ui/dashboard/plan-avail/plan-avail.module.css';

const PlanAvailPage = () => {
    const [plansList, setPlansList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlansList = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/trainer/plans", // Update with the correct endpoint
                    { withCredentials: true }
                );
                if (response.data && response.data.plans) {
                    console.log("Response Data:", response.data.plans);
                    setPlansList(response.data.plans);
                } else {
                    console.log("No data returned from API");
                    setError("No data returned from API");
                }
            } catch (error) {
                console.error("Error fetching plans list:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlansList();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.plansContainer}>
            <h2 className={styles.title}>Pricing Plans</h2>
            <p className={styles.subtitle}>Current Plans Available at our Gym</p>
            <div className={styles.cards}>
                {plansList.map((plan, index) => (
                    <div key={index} className={styles.card}>
                        <h3 className={styles.planTitle}>{plan.planName}</h3>
                        <p className={styles.level}>Level: {plan.level}</p>
                        <p className={styles.price}>Price: {plan.price}</p>
                        <p className={styles.category}>Category: {plan.category}</p>
                        <p className={styles.duration}>Duration: {plan.duration}</p>
                        <p className={styles.dateCreated}>
                            Date Created: {new Date(plan.dateCreated).toLocaleDateString()}
                        </p>
                        <ul className={styles.facilities}>
                            {plan.facilities.map((facility, i) => (
                                <li
                                    key={i}
                                    className={plan.isDisabled?.includes(i) ? styles.disabled : styles.enabled}
                                >
                                    {facility}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanAvailPage;
