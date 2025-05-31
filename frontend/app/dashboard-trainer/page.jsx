"use client";

import RightbarNotification from "../ui/dashboard/rightbar-notifi/rightbar-notifi";
import MyMembers from "../ui/dashboard/member-list/memeber-list";  // Fixed the typo
import ChartAtt from "../ui/dashboard/chart-attendance/chart-attendance"; 
import styles from "../ui/dashboard/dashboard.module.css";

const DashboardTrainer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <MyMembers />
        {/* <ChartAtt /> */}
      </div>
      <div className={styles.side}>
        <RightbarNotification />
      </div>
    </div>
  );
};

export default DashboardTrainer;
