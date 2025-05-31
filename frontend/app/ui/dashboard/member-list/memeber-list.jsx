"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import styles from "@/app/ui/dashboard/member-list/member-list.module.css";

const MemAttenPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerList, setCustomerList] = useState([]); // Customer list state

  // Set the default date to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/trainer/customer",
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.customers) {
          console.log("Response Data:", response.data.customers);
          setCustomerList(response.data.customers);
        } else {
          console.log("No data returned from API");
          setError("No data returned from API");
        }
      } catch (error) {
        console.error("Error fetching Users List", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerList();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attendance</h1>

      <div className={styles.tableContainer}>
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((member) => (
              <tr key={member.id}>
                <td>{member.fullName}</td>
                <td>{member.email}</td>
                <td>{member.age}</td>
                <td>
                  <Link href={`/dashboard-manager/attendance/singleAttendance?id=${member.id}`}>
                    <button className={styles.viewButton}>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemAttenPage;
