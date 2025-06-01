'use client';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managerList, setManagerList] = useState([]);

  const deleteManager = async (managerId) => {
    if (window.confirm('Are you sure you want to delete this manager?')) {
      try {
        const response = await axios.delete(`http://localhost:3001/owner/manager/${managerId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setManagerList((prev) => prev.filter((manager) => manager._id !== managerId));
          alert('Manager deleted successfully');
        }
      } catch (error) {
        setError('Error deleting manager');
        console.error('Error deleting manager:', error);
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
          setManagerList(response.data.managers);
        } else {
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

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-950 min-h-[75vh] text-white mt-5">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold">Manager Management</h1>
        <Link href="/dashboard-admin/manager/add-manager">
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
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {managerList.length > 0 ? (
              managerList.map((manager) => (
                <tr key={manager._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Image
                      src="/images/noavtar.png"
                      alt="Manager Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {manager.fullName}
                  </td>
                  <td className="px-4 py-2">{manager.email}</td>
                  <td className="px-4 py-2">{manager.age}</td>
                  <td className="px-4 py-2">{manager.contact}</td>
                  <td className="px-4 py-2">{manager.salary}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link href={`/dashboard-admin/manager/update/${manager._id}`}>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                          View
                        </button>
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                        onClick={() => deleteManager(manager._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No managers found
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

export default ManagerPage;
