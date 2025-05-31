"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import styles from "@/app/ui/dashboard/attendance/singleAttendance/singleAttendance.module.css";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const SingleAttendancePage = () => {
  const { role, id } = useParams();

  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!role || !id) return;

    const fetchAttendanceData = async () => {
      setIsLoading(true);
      try {
        const baseEndpoint = `http://localhost:3001/owner/${role === "member" ? "customer" : "trainer"}/attendence/${role}/${id}`;
        const response = await axios.get(baseEndpoint, { withCredentials: true });

        setAttendanceData(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch attendance data");
        setAttendanceData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, [role, id]);

  // Format date to dd-MM-yyyy
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
  };

  const formatStatus = (status) =>
    status === "Present" ? styles.present : styles.absent;

  if (!role || !id) {
    return <div className={styles.error}>Invalid URL parameters. Please check the URL.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        View Attendance for {role.charAt(0).toUpperCase() + role.slice(1)}
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
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
                  <td>{formatDate(entry.date)}</td>
                  <td className={formatStatus(entry.status)}>
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

      <Pagination data={attendanceData} />
    </div>
  );
};

export default SingleAttendancePage;
