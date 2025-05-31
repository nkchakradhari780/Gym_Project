'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./sidebar.module.css";
import Image from 'next/image';
import MenuLink from './menuLink/menuLink';

import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdOutlineSettings,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdHelpCenter,
    MdPersonOutline,
    MdLogout
} from "react-icons/md";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard-admin",
                icon: <MdDashboard />,
            },
            {
                title: "Managers",
                path: "/dashboard-admin/manager",
                icon: <MdPersonOutline />,
            },
            {
                title: "Trainers",
                path: "/dashboard-admin/trainers",
                icon: <MdPeople />,
            },
            {
                title: "User",
                path: "/dashboard-admin/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Equipments",
                path: "/dashboard-admin/equipments",
                icon: <MdShoppingBag />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Attendance",
                path: "/dashboard-admin/attendance",
                icon: <MdWork />,  
            },
            {
                title: "Transactions",
                path: "/dashboard-admin/transactions",
                icon: <MdAttachMoney />,  
            },
            {
                title: "Plans",
                path: "/dashboard-admin/plans",
                icon: <MdAnalytics />, 
            },
        ],
    },
];

const SidebarAdmin = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchAdminDetails = async () => {
    //         try{ 
    //             const response = await axios.get('http://localhost:3001/owner', {
    //                 withCredentials: true,
    //             });

    //             if(response.data) {
    //                 // console.log('Response Data Sidebar:', response.data);
    //                 setAdminDetails(response.data.owner);
    //             } else {
    //                 console.error('No data returned from API');
    //                 setError('No data returned from API');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching Admin Details:', error.message);
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAdminDetails();
    // }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            window.location.href = '/'; // Redirect to login or home page after logout
        } catch (error) {
            console.error('Error logging out:', error.message);
            setError('Failed to log out');
        }
    };

    if(loading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>Error: {error}</p>;
    }

    if(!adminDetails) {
        return <p>No Admin Details found</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/images/noavtar.png" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{adminDetails.fullName}</span>
                    <span className={styles.userTitle}>{adminDetails.role}</span>
                </div>
            </div>

            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logoutbtn} onClick={handleLogout}>
                <MdLogout />
                Logout
            </button>
        </div>
    );
};

export default SidebarAdmin;
