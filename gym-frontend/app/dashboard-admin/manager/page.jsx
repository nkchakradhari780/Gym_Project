"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/managers/managers.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerPage = () => {
    const [isActive, setIsActive] = useState(true); // Default to active
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [managerList, setManagerList] = useState([]); // Set default state to an empty array

    // Function to toggle user status (for each individual manager)
    const toggleStatus = () => {
        setIsActive(!isActive);
    };

    // Function to delete a manager
    const deleteManager = async (managerId) => {
        if (window.confirm("Are you sure you want to delete this manager?")) {
            try {
                // Make a DELETE request to the server
                const response = await axios.delete(`http://localhost:3001/owner/manager/${managerId}`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    // Remove the deleted manager from the state
                    setManagerList(managerList.filter(manager => manager._id !== managerId));
                    alert("Manager deleted successfully");
                }
            } catch (error) {
                setError("Error deleting manager");
                console.error("Error deleting manager:", error);
            }
        }
    };

    useEffect(() => {
        const fetchManagerList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/owner/manager', {
                    withCredentials: true,
                });

                if (response.data && response.data.managers) {
                    console.log('Response Data:', response.data.managers);
                    setManagerList(response.data.managers); // Assuming `managers` is the key in the API response
                } else {
                    console.log('No data returned from API');
                    setError('No data returned from API');
                }
            } catch (error) {
                console.error('Error fetching manager list', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchManagerList();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {/* <Search placeholder="Search for a manager..." /> */}
                <Link href="/dashboard-admin/manager/add-manager">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {managerList.length > 0 ? (
                        managerList.map((manager) => (
                            <tr key={manager._id}>
                                <td>
                                    <div className={styles.manager}>
                                        <Image
                                            src="/images/noavtar.png" // Adjust this path if needed
                                            alt="Manager Avatar"
                                            width={40}
                                            height={40}
                                            className={styles.managerImage}
                                        />
                                        {manager.fullName}
                                    </div>
                                </td>
                                <td>{manager.email}</td>
                                <td>{manager.age}</td> {/* Adjust if there's a specific DOB field */}
                                <td>{manager.contact}</td>
                                <td>
                                    <button
                                        className={`${styles.button} ${manager.isActive ? styles.active : styles.inactive}`}
                                        onClick={toggleStatus}
                                    >
                                        {manager.status}
                                    </button>
                                </td>
                                <td>
                                    <div className={styles.buttons}>
                                        <Link href={`/dashboard-admin/manager/update/${manager._id}`}>
                                            <button className={`${styles.button} ${styles.View}`}>View</button>
                                        </Link>
                                        <button
                                            className={`${styles.button} ${styles.Delete}`}
                                            onClick={() => deleteManager(manager._id)} // Call the delete function on button click
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No managers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default ManagerPage;
