"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import styles from "@/app/ui/dashboard/attendance/attendance.module.css";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "Nisha", status: null },
    { id: 2, name: "Nitin", status: null },
    { id: 3, name: "Kanha", status: null },
  ]);

  const [selectedDate, setSelectedDate] = useState("");

  // Set the default date to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setSelectedDate(today);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const markAttendance = (id, status) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) =>
        entry.id === id ? { ...entry, status: status } : entry
      )
    );
  };
  const handleSubmit = () => {
    // Submit attendance data logic here
    console.log("Attendance submitted for date:", selectedDate);
    console.log("Attendance data:", attendanceData);
    // You can replace the above console logs with your actual submission logic, e.g., sending the data to your backend.
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attendance</h1>

      <div className={styles.dateContainer}>
        <label htmlFor="attendanceDate">Date: </label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.dateInput}
        />
      </div>

      <table className={styles.attendanceTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>
                <button
                  className={styles.presentButton}
                  onClick={() => markAttendance(person.id, "Present")}
                  disabled={person.status === "Present"}
                >
                  Present
                </button>
              </td>
              <td>
                <button
                  className={styles.absentButton}
                  onClick={() => markAttendance(person.id, "Absent")}
                  disabled={person.status === "Absent"}
                >
                  Absent
                </button>
              </td>
              <td>
                <Link href={`/dashboard-manager/attendance/singleAttendance`}>
                  <button className={styles.viewButton}>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit Attendance
        </button>
        </div>
    </div>
  );
};

export default AttendancePage;
