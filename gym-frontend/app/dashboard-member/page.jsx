"use client";

// import ChartAtt from "../ui/dashboard/chart-attendance/chart-attendance"; 
import RightbarNotification from "../ui/dashboard/rightbar-notifi/rightbar-notifi";
import WeekAttendance from "../ui/dashboard/attend-week/attend-week";  // Fixed the typo
import styles from "../ui/dashboard/dashboard.module.css";
import PlanAvailable from '../ui/dashboard/plan-avail/plan-avail';

const DashboardMember = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <WeekAttendance />
        <PlanAvailable />
        
      </div>
      <div className={styles.side}>
        <RightbarNotification />
      </div>
    </div>
  );
};

export default DashboardMember;
