"use client";

import { useState } from "react";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import styles from "@/app/ui/dashboard/attendance/singleAttendance/singleAttendance.module.css"; 
import Pagination from '@/app/ui/dashboard/pagination/pagination';

const SingleAttendPage = ({ memberId, memberName }) => { // Accept memberName as a prop
  const [attendanceData, setAttendanceData] = useState([
    { date: "01-02-2024", status: "Absent" },
    { date: "01-03-2024", status: "Present" },
    { date: "01-01-2024", status: "Present" },
    { date: "01-04-2024", status: "Present" },
    { date: "01-05-2024", status: "Absent" },
    { date: "01-06-2024", status: "Present" },
    { date: "01-07-2024", status: "Present" },
  ]);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [error, setError] = useState(null);

  // Extract the selected year from the date
  const selectedYear = selectedDate.getFullYear();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>View Attendance for {memberName}</h1> {/* Display member name */}

      <div className={styles.filterContainer}>
        <label>Year:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showYearPicker // Show only year selection
          dateFormat="yyyy" // Format to display only the year
          className={styles.filterSelect}
        />

        <label>Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.filterSelect}
        >
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {error ? ( 
        <div className={styles.error}>{error}</div>
      ) : (
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td className={entry.status === "Present" ? styles.present : styles.absent}>
                    {entry.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      
        <Pagination />

    </div>
  );
};

export default SingleAttendPage;
