"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import axios from "axios";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [isActive, setIsActive] = useState(true); // Default to active
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to toggle user status (for each individual user)
  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/manager/customer",
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.customers) {
          console.log("Response Data:", response.data.customers);
          setUsersList(response.data.customers);
        } else {
          console.log("No data returned from API");
          setError("No Data returned from API");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersList();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/manager/customer/${userId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setUsersList(
            usersList.filter((customer) => customer._id !== userId)
          );
          alert("User Deleted Successfully");
        }
      } catch (error) {
        setError("Error deleting User");
        console.error("Error deleting user", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard-manager/users/add-user">
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 ? (
            usersList.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/images/noavtar.png"
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {user.fullName}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>
                  {/* Display the names of the plans the user is enrolled in */}
                  {user.joinedPlans && user.joinedPlans.length > 0 ? (
                    user.joinedPlans.map((plan, index) => (
                      <span key={index}>
                        {plan.planName}
                        {index < user.joinedPlans.length - 1 ? ", " : ""}
                      </span>
                    ))
                  ) : (
                    "No Plans"
                  )}
                </td>
                <td>
                  <button
                    className={`${styles.button} ${user.isActive ? styles.active : styles.inactive}`}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard-manager/users/update/${user._id}`}>
                      <button className={`${styles.button} ${styles.View}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.Delete}`}
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );

  function toggleUserStatus(userId) {
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  }
};

export default UsersPage;
