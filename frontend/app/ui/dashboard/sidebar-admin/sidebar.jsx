"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdPersonOutline,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard-admin", icon: <MdDashboard /> },
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
      { title: "Plans", path: "/dashboard-admin/plans", icon: <MdAnalytics /> },
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
        const response = await axios.get("http://localhost:3001/owner", {
          withCredentials: true,
        });
        if (response.data) {
          setAdminDetails(response.data.owner);
        } else {
          setError("No data returned from API");
        }
      } catch (error) {
        console.error("Error fetching Admin Details:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error.message);
      setError("Failed to log out");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-20">Error: {error}</p>;
  if (!adminDetails)
    return (
      <p className="text-center text-gray-500 mt-20">No Admin Details found</p>
    );

  return (
    <aside className="sticky top-0 h-screen w-64 bg-gray-900 p-4 flex flex-col justify-between text-white max-h-[95vh]">
      {/* Admin Info */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/images/noavtar.png"
          alt="Avatar"
          width={60}
          height={60}
          className="rounded-full object-cover border-2 border-gray-700"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{adminDetails.fullName}</span>
          <span className="text-sm text-gray-400 capitalize">
            {adminDetails.role}
          </span>
        </div>
      </div>
      {/* Scrollable content */}
      <div className="overflow-y-auto scrollbar-hide flex-grow pr-2 max-h-[80vh] ">
        {/* Menu List */}
        <nav>
          {menuItems.map((category) => (
            <div key={category.title} className="mb-8 last:mb-0">
              <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-3">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors rounded-md py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Logout"
      >
        <MdLogout size={20} />
        Logout
      </button>
    </aside>
  );
};

export default SidebarAdmin;
