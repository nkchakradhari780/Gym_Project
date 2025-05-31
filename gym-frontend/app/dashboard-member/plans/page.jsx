'use client'
import styles1 from "@/app/ui/dashboard/plans/plans.module.css";
import styles from "@/app/ui/dashboard/plan-avail/plan-avail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const PlanMemberPage = () => {
    const [planList, setPlanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching the plans from the backend
    useEffect(() => {
        const fetchPlansList = async () => {
            try {
                const response = await axios.get("http://localhost:3001/customer/plans/list ", {
                    withCredentials: true,
                });

                if (response.data && response.data.plans) {
                    console.log("Response Data Plans:", response.data.plans);
                    setPlanList(response.data.plans);  // Store plans in planList state
                } else {
                    setError("No plans available.");
                }
            } catch (error) {
                console.error("Error fetching plans:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);  // Hide loading spinner after data fetch
            }
        };

        fetchPlansList();
    }, []);  // Empty dependency array to run only once on component mount

    if (loading) {
        return <div>Loading...</div>;  // Show loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>;  // Show error message if fetching fails
    }
    const handleBuyPlan = async (plan) => {
        // Show confirmation dialog before proceeding
        const isConfirmed = window.confirm(`Are you sure you want to buy the plan: ${plan.planName}?`);
    
        if (!isConfirmed) {
            // If the user cancels, exit the function
            return;
        }
    
        try {
            // Send the plan details to the backend via a POST request
            console.log("Buying plan", plan);
            const response = await axios.post(
                "http://localhost:3001/customer/byplan", // Backend endpoint for buying the plan
                { planId: plan._id, Name: plan.planName, price: plan.price, category: plan.category, duration: plan.duration },
                { withCredentials: true }
            );
    
            // Handle the backend response for a successful plan purchase
            if (response.status === 200) {
                console.log(`Successfully bought plan: ${plan.planName}`);
                alert("Plan purchased successfully!");  
            }
        } catch (error) {
            // Check if it's a 400 error for "Already enrolled in this plan"
            if (error.response && error.response.status === 400) {
                console.log("Already enrolled in this plan");
                alert("You are already enrolled in this plan.");
            } else {
                console.error("Error buying plan:", error.message);
            }
        }
    };
    
    

    return (
        <div className={styles1.container}>
            <div className={styles1.main}>
                <div className={styles.plansContainer}>
                    <h2 className={styles.title}>Pricing Plans</h2>
                    <p className={styles.subtitle}>Current Plans Available at our Gym</p>
                    <div className={styles.cards}>
                        {/* Use planList here instead of planData */}
                        {planList.map((plan, index) => (
                            <div key={index} className={styles.card}>
                                <h3 className={styles.planTitle}>{plan.title}</h3>
                                <p className={styles.level}>{plan.level}</p>
                                <p className={styles.price}>{plan.price}/month</p>
                                <p className={styles.category}>Category: {plan.category}</p>
                                <p className={styles.duration}>Duration: {plan.duration} months</p>
                                <p className={styles.dateCreated}>Date Created: {plan.dateCreated}</p>
                                <ul className={styles.facilities}>
                                    {plan.facilities.map((facility, i) => (
                                        <li
                                            key={i}
                                            className={
                                                plan.isDisabled && Array.isArray(plan.isDisabled) && plan.isDisabled.includes(i)
                                                ? styles.disabled
                                                : styles.enabled
                                            }
                                        >
                                            {facility}
                                        </li>
                                    ))}
                                </ul>

                                {/* Add the "Buy Plan" button */}
                                <button
                                    onClick={() => handleBuyPlan(plan)} // Pass the entire plan object to handleBuyPlan
                                    className={styles.buyButton}
                                >
                                    Buy Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanMemberPage;
