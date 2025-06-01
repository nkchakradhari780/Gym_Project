"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { useState, useEffect } from "react";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/owner/customer", {
          withCredentials: true,
        });
        if (response.data && response.data.customers) {
          setCustomerList(response.data.customers);
        } else {
          setError("No data returned from API");
        }
      } catch (error) {
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
        const response = await axios.delete(
          `http://localhost:3001/owner/customer/${userId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setCustomerList(customerList.filter((c) => c._id !== userId));
          alert("User Deleted Successfully");
        }
      } catch (error) {
        setError("Error deleting User");
      }
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-950 min-h-[75vh] text-white mt-5">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <Link href="/dashboard-admin/users/add-user">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
            Add New
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-800">
        <table className="min-w-full text-sm text-left bg-gray-900 text-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Expiration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {customerList.length > 0 ? (
              customerList.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Image
                      src="/images/noavtar.png"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {customer.fullName}
                  </td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.age}</td>
                  <td className="px-4 py-2">{customer.gender}</td>
                  <td className="px-4 py-2">{customer.plan}</td>
                  <td className="px-4 py-2">{customer.expiration}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.isActive ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {customer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link href={`/dashboard-admin/users/update/${customer._id}`}>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteUser(customer._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  No Users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination />
      </div>
    </div>
  );
};

export default UsersPage;
