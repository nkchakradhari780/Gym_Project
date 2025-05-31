"use client"

import Card from "../ui/dashboard/card/card";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";

const DashboardManager= () => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.main}>
      <div className={styles.cards}>
      <Card title="Total Users" number={10} />
        <Card title="Active Users" number={5} />
        <Card title="New Signups" number={3} />
      </div>
      <Transactions />
      <Chart />
    </div>
    <div className={styles.side}>
      <Rightbar />
    </div>

  </div>
  );
};

export default DashboardManager;
