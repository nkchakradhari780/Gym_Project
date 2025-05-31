"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios"; // Make sure axios is imported
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { useState, useEffect } from "react";


const UsersPage = () => {
  const [isActive, setIsActive] = useState(true); // Default to active
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerList, setCustomerList] = useState([]);

  // Function to toggle user status
  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/owner/customer",
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

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      try {
        const response = await axios.delete(`http://localhost:3001/owner/customer/${userId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setCustomerList(
            customerList.filter((customer) => customer._id !== userId)
          );
          alert("User Deleted Successfully");
        }
      } catch (error) {
        setError("Error deleting User");
        console.error("Error deleting user", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard-admin/users/add-user">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Plan</th>
            <th>Expiration</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerList.length > 0 ? (
            customerList.map((customer) => (
              <tr key={customer._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/images/noavtar.png"
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {customer.fullName}
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.age}</td>
                <td>{customer.gender}</td>
                <td>{customer.plan}</td>
                <td>{customer.expiration}</td>
                <td>
                  <button
                    className={`${styles.button} ${
                      customer.isActive ? styles.active : styles.inactive
                    }`}
                    onClick={() => toggleStatus()}
                  >
                    {customer.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link
                      href={`/dashboard-admin/users/update/${customer._id}`}
                    >
                      <button className={`${styles.button} ${styles.View}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.Delete}`}
                      onClick={() => deleteUser(customer._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6"> No Users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
