'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const EquipmentPage = () => {
  const [equipmentsList, setEquipmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentsList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/owner/equipment", {
          withCredentials: true,
        });
        if (response.data && response.data.equipments) {
          setEquipmentsList(response.data.equipments);
        } else {
          setError("No data returned from API");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentsList();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const updatedStatus = !currentStatus;
    try {
      setEquipmentsList((prevEquipments) =>
        prevEquipments.map((equipment) =>
          equipment._id === id ? { ...equipment, status: updatedStatus } : equipment
        )
      );
      await axios.put(
        `http://localhost:3001/owner/equipment/${id}`,
        { status: updatedStatus },
        { withCredentials: true }
      );
    } catch (error) {
      setError("Failed to update status");
      setEquipmentsList((prevEquipments) =>
        prevEquipments.map((equipment) =>
          equipment._id === id ? { ...equipment, status: currentStatus } : equipment
        )
      );
    }
  };

  const deleteEquipment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this equipment?")) return;

    try {
      const response = await axios.delete(`http://localhost:3001/owner/equipment/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setEquipmentsList((prevEquipments) =>
          prevEquipments.filter((equipment) => equipment._id !== id)
        );
        alert("Equipment deleted successfully");
      } else {
        alert("Failed to delete the equipment");
      }
    } catch (error) {
      setError("Failed to delete equipment");
    }
  };

  if (loading)
    return <div className="text-white p-4">Loading...</div>;

  if (error)
    return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-950 min-h-screen text-white mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold">Equipment Management</h1>
        <Link href="/dashboard-admin/equipments/add-equipment">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
            Add New
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-800">
        <table className="min-w-full text-sm text-left bg-gray-900 text-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Purchased On</th>
              <th className="px-4 py-3">Price (₹)</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Total (₹)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {equipmentsList.length > 0 ? (
              equipmentsList.map((equipment) => (
                <tr
                  key={equipment._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Image
                      src="/images/noequipment.jpg"
                      alt="Equipment Image"
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    {equipment.name}
                  </td>
                  <td className="px-4 py-2">{equipment.id}</td>
                  <td className="px-4 py-2">{new Date(equipment.purchaseDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">₹{equipment.purchasePrice}</td>
                  <td className="px-4 py-2">{equipment.quantity}</td>
                  <td className="px-4 py-2">₹{equipment.purchasePrice * equipment.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleStatus(equipment._id, equipment.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        equipment.status ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {equipment.status ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link href={`/dashboard-admin/equipments/update/${equipment.id}`}>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                          Update
                        </button>
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                        onClick={() => deleteEquipment(equipment._id)}
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
                  No Equipments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination />
      </div>
    </div>
  );
};

export default EquipmentPage;
