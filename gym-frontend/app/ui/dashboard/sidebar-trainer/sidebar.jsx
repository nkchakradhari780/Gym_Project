"use client";  // This line marks the component as a client-side component

import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Image from 'next/image';
import styles from './sidebar.module.css';
import { MdMenu, MdClose, MdDashboard, MdSupervisedUserCircle, MdPersonOutline, MdFitnessCenter, MdEventNote, MdWork, MdLogout, MdAnalytics } from "react-icons/md";  // Import MdAnalytics
import MenuLink from './menuLink/menuLink'; // Import the MenuLink component

const menuItems = [
    {
        list: [
            { title: "Dashboard", path: "/dashboard-trainer", icon: <MdDashboard /> },
            { title: "Profile", path: "/dashboard-trainer/profile", icon: <MdPersonOutline /> },
            { title: "Your Member", path: "/dashboard-trainer/my-member", icon: <MdSupervisedUserCircle /> },
            { title: "Equipments", path: "/dashboard-trainer/equipments", icon: <MdFitnessCenter /> },
        ],
    },
    {
        list: [
            { title: "Attendance", path: "/dashboard-trainer/attendance", icon: <MdEventNote /> },
            { title: "My Attendance", path: "/dashboard-trainer/my-attendance", icon: <MdWork /> },
            { title: "Plans", path: "/dashboard-trainer/plans", icon: <MdAnalytics /> },  // Use MdAnalytics here
        ],
    },
];

const SidebarTrainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null); // Dynamic user state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/trainer', { withCredentials: true });
                setUser(response.data.trainer); // Set user details dynamically
            } catch (error) {
                console.error('Error fetching user info:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const confirmLogout = () => {
        if (confirm('Are you sure you want to log out?')) {
            handleLogout();
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            window.location.href = '/'; // Redirect to login or home page after logout
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <button className={styles.menuBtn} onClick={toggleSidebar}>
                {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            <div className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}>
                <div className={styles.user}>
                    <Image className={styles.userImage} src="/images/noavtar.png" alt="" width="50" height="50" />
                    <div className={styles.userDetail}>
                        <span className={styles.username}>{user ? user.fullName : 'N/A'}</span>
                        <span className={styles.userTitle}>{user ? user.role : 'Trainer'}</span>
                    </div>
                </div>

                <ul className={styles.list}>
                    {menuItems.map((cat, index) => (
                        <li key={index}>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </li>
                    ))}
                </ul>
                <button className={styles.logoutbtn} onClick={confirmLogout}>
                    <MdLogout />
                    Logout
                </button>
            </div>
        </>
    );
};

export default SidebarTrainer;
    