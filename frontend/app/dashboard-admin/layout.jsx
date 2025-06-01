'use client';

import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar-admin/sidebar";
import Footer from "../ui/dashboard/footer/footer";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow bg-gray-100 dark:bg-gray-950 text-black dark:text-white overflow-hidden">
        <Navbar />
        <main className="flex-grow p-4 overflow-auto scrollbar-hide">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
