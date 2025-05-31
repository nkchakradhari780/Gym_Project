"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTransactionPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    costumer: "",
    amount: "",
    type: "membership", // Default value
    status: "pending", // Default value
    description: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/transactions/add",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess("Transaction added successfully!");
        setFormData({
          costumer: "",
          amount: "",
          type: "membership",
          status: "pending",
          description: "",
        });

        // Redirect to transactions list after 2 seconds
        setTimeout(() => router.push("/dashboard/transactions"), 2000);
      }
    } catch (err) {
      console.error("Error adding transaction:", err.message);
      setError(err.response?.data?.message || "Failed to add transaction.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-gray-900 p-6 rounded-md shadow-md"
      >
        {/* Costumer ID */}
        <div className="mb-4">
          <label
            htmlFor="costumer"
            className="block text-white font-medium mb-2"
          >
            Customer ID
          </label>
          <input
            type="text"
            id="costumer"
            name="costumer"
            value={formData.costumer}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter customer ID"
            required
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-white font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-white font-medium mb-2">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="membership">Membership</option>
            <option value="purchase">Purchase</option>
            <option value="refund">Refund</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-white font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a description (optional)"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
