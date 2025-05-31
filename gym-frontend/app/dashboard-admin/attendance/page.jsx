"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "@/app/ui/dashboard/attendance/attendance.module.css";

const AttendanceAdPage = () => {
  const [trainerAttendance, setTrainerAttendance] = useState([]);
  const [customerAttendance, setCustomerAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set the current date initially
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // Fetch data when selectedDate changes
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/owner/customer/attendance/list",
          { withCredentials: true }
        );

        if (response.data && response.data.attendanceData) {
          console.log(
            "Customer Attendence List:",
            response.data.attendanceData
          );
          setCustomerAttendance(
            response.data.attendanceData.map((attendanceData) => {
              const attendanceArray = attendanceData.attendance || [];
              const attendanceRecord = attendanceArray.find((entry) => {
                const entryDate = new Date(entry.date)
                  .toISOString()
                  .split("T")[0];
                return entryDate === selectedDate;
              });

              return {
                id: attendanceData.customerId,
                name: attendanceData.name,
                email: attendanceData.email,
                attendance: attendanceArray,
                role: attendanceData.role,
                status: attendanceRecord ? attendanceRecord.status : "",
                date: selectedDate,
                submitted: false, // Add the `submitted` field
              };
            })
          );
        } else {
          setError("No customer data returned from API");
        }
      } catch (error) {
        console.error("Error fetching customer list:", error.message);
        setError(error.message);
      }
    };

    const fetchTrainersList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/owner/trainer/attendance/list",
          { withCredentials: true }
        );

        if (response.data && response.data.attendanceData) {
          console.log(
            "Trainers Attendance List:",
            response.data.attendanceData
          );
          setTrainerAttendance(
            response.data.attendanceData.map((attendanceData) => {
              const attendanceArray = attendanceData.attendance || [];
              const attendanceRecord = attendanceArray.find((entry) => {
                const entryDate = new Date(entry.date)
                  .toISOString()
                  .split("T")[0];
                return entryDate === selectedDate;
              });

              return {
                id: attendanceData.trainerId,
                name: attendanceData.name,
                email: attendanceData.email,
                attendance: attendanceArray,
                role: attendanceData.role,
                status: attendanceRecord ? attendanceRecord.status : "",
                date: selectedDate,
                submitted: false, // Add the `submitted` field
              };
            })
          );
        } else {
          setError("No trainer data returned from API");
        }
      } catch (error) {
        console.error("Error fetching trainer list:", error.message);
        setError(error.message);
      }
    };

    if (selectedDate) {
      setLoading(true);
      Promise.all([fetchCustomerList(), fetchTrainersList()]).finally(() =>
        setLoading(false)
      );
    }
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const markAttendance = (id, status, type) => {
    const updateAttendance = (data) =>
      data.map((entry) =>
        entry.id === id ? { ...entry, status: status } : entry
      );

    if (type === "trainer") {
      setTrainerAttendance((prevData) => updateAttendance(prevData));
    } else {
      setCustomerAttendance((prevData) => updateAttendance(prevData));
    }
  };

  const handleTrainerSubmit = async () => {
    try {
      for (const trainer of trainerAttendance) {
        const dataToSubmit = {
          email: trainer.email,
          date: selectedDate,
          status: trainer.status || "Absent",
        };

        console.log("Trainer Data to submit", dataToSubmit)

        const response = await axios.post(
          "http://localhost:3001/owner/trainer/attendence/mark",
          dataToSubmit,
          { withCredentials: true }
        );

        if (response.status !== 200) {
          throw new Error(
            "Failed to submit trainer attendance. Please try again."
          );
        }
      }

      setTrainerAttendance((prevAttendance) =>
        prevAttendance.map((entry) => ({ ...entry, submitted: true }))
      );

      alert("Trainer attendance successfully submitted!");
    } catch (error) {
      console.error("Error submitting trainer attendance:", error.message);
      alert(
        "An error occurred while submitting trainer attendance. Please try again."
      );
    }
  };

  const handleCustomerSubmit = async () => {
    try {
      for (const customer of customerAttendance) {
        const dataToSubmit = {
          email: customer.email,
          date: selectedDate,
          status: customer.status || "Absent",
        };

        console.log("Cutomer Data to submit:",dataToSubmit)

        const response = await axios.post(
          "http://localhost:3001/owner/customer/attendance/mark",
          dataToSubmit,
          { withCredentials: true }
        );

        if (response.status !== 200) {
          throw new Error(
            "Failed to submit customer attendance. Please try again."
          );
        }
      }

      setCustomerAttendance((prevAttendance) =>
        prevAttendance.map((entry) => ({ ...entry, submitted: true }))
      );

      alert("Customer attendance successfully submitted!");
    } catch (error) {
      console.error("Error submitting customer attendance:", error.message);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while submitting attendance.";
      alert(errorMessage);
    }
  };

  const renderTable = (data, type) => (
    <table className={styles.attendanceTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Present</th>
          <th>Absent</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.email}</td>
            <td>
              <button
                className={`
                  ${styles.presentButton} 
                  ${
                    person.status === "Present"
                      ? styles.disabledButton1
                      : person.status === "Absent"
                      ? styles.disabledButton2
                      : ""
                  }
                `}
                onClick={() => markAttendance(person.id, "Present", type)}
                disabled={person.submitted}
              >
                Present
              </button>
            </td>
            <td>
              <button
                className={`
                  ${styles.absentButton} 
                  ${
                    person.status === "Absent"
                      ? styles.disabledButton1
                      : person.status === "Present"
                      ? styles.disabledButton2
                      : ""
                  }
                `}
                onClick={() => markAttendance(person.id, "Absent", type)}
                disabled={person.submitted}
              >
                Absent
              </button>
            </td>
            <td>
              <Link href={`/dashboard-admin/attendance/singleAttendance/${person.role}/${person.id}`}>
                <button className={styles.viewButton}>View</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attendance</h1>

      <div className={styles.dateContainer}>
        <div className={styles.dateContainer1}>
          <label htmlFor="attendanceDate">Date: </label>
          <input
            type="date"
            id="attendanceDate"
            value={selectedDate}
            onChange={handleDateChange}
            className={styles.dateInput}
          />
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Trainers</h2>
      {trainerAttendance.length > 0 ? (
        <>
          {renderTable(trainerAttendance, "trainer")}
          <button 
            className={styles.submitButton} 
            onClick={handleTrainerSubmit}
          >
            Submit Trainer Attendance
          </button>
        </>
      ) : (
        <p>No trainers available.</p>
      )}

      <h2 className={styles.sectionTitle}>Customers</h2>
      {customerAttendance.length > 0 ? (
        <>
          {renderTable(customerAttendance, "customer")}
          <button
            className={styles.submitButton}
            onClick={handleCustomerSubmit}
          >
            Submit Customer Attendance
          </button>
        </>
      ) : (
        <p>No customers available.</p>
      )}
    </div>
  );
};

export default AttendanceAdPage;
