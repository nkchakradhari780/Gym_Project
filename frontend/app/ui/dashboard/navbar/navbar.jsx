"use client";

import { usePathname } from 'next/navigation';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop() || "Dashboard";

  return (
    <div className="w-full flex items-center justify-between px-5 py-3 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      {/* Page Title */}
      <div className="text-lg font-semibold capitalize text-gray-800 dark:text-white">
        {currentPage}
      </div>

      {/* Menu */}
      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-800">
          <MdSearch className="text-gray-600 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
