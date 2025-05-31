"use client";

import { useState } from "react";
import styles from "@/app/ui/dashboard/attend-week/attend-week.module.css";

const WeekAttendPage = () => {
  const [attendanceData] = useState([
    { date: "16-10-2024", status: "Present" },
    { date: "17-10-2024", status: "Absent" },
    { date: "18-10-2024", status: "Present" },
    { date: "19-10-2024", status: "Present" },
    { date: "20-10-2024", status: "Absent" },
    { date: "21-10-2024", status: "Present" },
    { date: "22-10-2024", status: "Present" },
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weekly Attendance</h1>

      <div className={styles.tableContainer}>
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.viewButton}>View</button>
      </div>
    </div>
  );
};

export default WeekAttendPage;
