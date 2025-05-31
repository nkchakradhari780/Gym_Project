'use client';

import { useEffect, useState } from 'react';
import styles from './sidebar.module.css'; // Adjust path as needed
import Image from 'next/image';
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
    MdLogout,
} from 'react-icons/md';
import MenuLink from './menuLink/menuLink'; // Import the MenuLink component
import axios from 'axios';

const menuItems = [
    {
        title: 'Pages',
        list: [
            {
                title: 'Dashboard',
                path: '/dashboard-member',
                icon: <MdDashboard />,
            },
            {
                title: 'Profile',
                path: '/dashboard-member/profile',
                icon: <MdPersonOutline />,
            },
            {
                title: 'Your Plan',
                path: '/dashboard-member/my-plan',
                icon: <MdSupervisedUserCircle />,
            },
        ],
    },
    {
        title: 'Analytics',
        list: [
            {
                title: 'Attendance',
                path: '/dashboard-member/attendance',
                icon: <MdWork />,
            },
            {
                title: 'Plans',
                path: '/dashboard-member/plans',
                icon: <MdAnalytics />,
            },
        ],
    },
];

const SidebarMember = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [memberDetails, setMemberDetails] = useState(null);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/customer/profile', {
                    withCredentials: true,
                });

                if (response.data?.customer) {
                    // console.log('Response Data sidebar:', response.data.customer);
                    setMemberDetails(response.data.customer);
                } else {
                    console.error('No data returned from API');
                    setError('No data returned from API');
                }
            } catch (error) {
                console.error('Error fetching member details:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberDetails();
    }, []); // Empty dependency array ensures this runs only once

    const handleLogout = async () => {
        setLoading(true);
        try {
            // Make the API call to the backend /logout route
            const response = await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });

            if (response.status === 200) {
                // Redirect or handle successful logout
                window.location.href = '/'; // Redirect to login or home page
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    className={styles.userImage}
                    src={memberDetails?.profileImage || '/images/noavtar.png'}
                    alt="User Avatar"
                    width={50}
                    height={50}
                />
                <div className={styles.userDetail}>
                    <span className={styles.username}>
                        {memberDetails?.fullName || 'Guest User'}
                    </span>
                    <span className={styles.userTitle}>
                        {memberDetails?.role || 'Member'}
                    </span>
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

            <button className={styles.logoutbtn} onClick={handleLogout} disabled={loading}>
                <MdLogout />
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};

export default SidebarMember;
    