'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
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

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try { 
                const response = await axios.get('http://localhost:3001/owner', {
                    withCredentials: true,
                });

                if (response.data) {
                    setAdminDetails(response.data.owner);
                } else {
                    setError('No data returned from API');
                }
            } catch (error) {
                console.error('Error fetching Admin Details:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminDetails();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error.message);
            setError('Failed to log out');
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!adminDetails) return <p className="text-center text-gray-500">No Admin Details found</p>;

    return (
        <div className="sticky top-10 p-4 w-full max-w-xs">
            {/* Admin Info */}
            <div className="flex items-center gap-4 mb-6">
                <Image src="/images/noavtar.png" alt="Avatar" width={50} height={50} className="rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="font-medium">{adminDetails.fullName}</span>
                    <span className="text-xs text-gray-400">{adminDetails.role}</span>
                </div>
            </div>

            {/* Menu List */}
            <ul className="space-y-4">
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{cat.title}</span>
                        <ul className="mt-2 space-y-2">
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mt-6 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                <MdLogout />
                Logout
            </button>
        </div>
    );
};

export default SidebarAdmin;
