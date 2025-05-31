"use client";

import Card from "../ui/dashboard/card/card";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState({
    totalManagers: 0,
    totalTrainers: 0,
    totalMembers: 0,
  });

  useEffect(() => {
    const fetchCountDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/owner/count", {
          withCredentials: true,
        });

        if (response.data) {
          console.log("Response Data:", response.data);
          setCount({
            totalManagers: response.data.managerCount,
            totalTrainers: response.data.trainerCount,
            totalMembers: response.data.customerCount,
          });
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching count details:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountDetails(); // Call the function inside the `useEffect`
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card title="Total Managers" number={count.totalManagers} />
          <Card title="Total Trainers" number={count.totalTrainers} />
          <Card title="Total Members" number={count.totalMembers} />
        </div>
        <Transactions />
        {/* <Chart /> */}
      </div>
      <div className={styles.side}>
        {/* <Rightbar /> */}
      </div>
    </div>
  );
};

export default DashboardAdmin;
