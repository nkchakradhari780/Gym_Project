"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const AddEquiPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    brand: "",
    purchaseDate: "",
    purchasePrice: "",
    maintenanceDate: "",
    condition: "",
    location: "",
    status: "Available",
    description: "",
    quantity: 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      name,
      type,
      brand,
      purchaseDate,
      purchasePrice,
      maintenanceDate,
      condition,
      location,
      description,
      quantity,
      status,
    } = formData;

    try {
      console.log("Adding new equipment with", formData);

      const response = await axios.post(
        "http://localhost:3001/owner/equipment/add",
        {
          id,
          name,
          type,
          brand,
          purchaseDate,
          purchasePrice,
          maintenanceDate,
          condition,
          location,
          description,
          quantity,
          status,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Equipment added successfully", response.data);
      setSuccess(true); // Show success message
      setError(""); // Clear any previous error
    } catch (err) {
      setError("Error Adding Equipment");
      setSuccess(false);
      console.error(
        "Process Failed:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const closePopup = () => {
    setSuccess(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-gray-950 rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side could be an image or info, but for simplicity, form spans whole */}
        <form onSubmit={handleSubmit} className="space-y-6 col-span-full">
          {/* Equipment ID */}
          <div>
            <label className="block mb-1">
              Equipment ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Equipment Name */}
          <div>
            <label className="block mb-1">
              Equipment Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Balance">Balance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block mb-1">
              Purchase Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block mb-1">
              Purchase Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="purchasePrice"
              min="0"
              value={formData.purchasePrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Maintenance Date */}
          <div>
            <label className="block mb-1">Maintenance Date</label>
            <input
              type="date"
              name="maintenanceDate"
              value={formData.maintenanceDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block mb-1">
              Condition <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Condition
              </option>
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Cardio Section">Cardio Section</option>
              <option value="Weightlifting Area">Weightlifting Area</option>
              <option value="Yoga Room">Yoga Room</option>
              <option value="Main Floor">Main Floor</option>
              <option value="Basement">Basement</option>
              <option value="First Floor">First Floor</option>
              <option value="Second Floor">Second Floor</option>
              <option value="Pool Area">Pool Area</option>
              <option value="Locker Room">Locker Room</option>
              <option value="Reception">Reception</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Out of Order">Out of Order</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg"
            >
              Submit
            </button>
            <Link href="/dashboard-admin/equipments">
              <button
                type="button"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>

        {/* Popup for success */}
        {success && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={closePopup}
          >
            <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg max-w-xs text-center">
              <p className="mb-4 font-semibold">Equipment added successfully!</p>
              <button
                onClick={closePopup}
                className="bg-white text-green-700 font-semibold px-4 py-2 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Popup for error */}
        {error && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={closePopup}
          >
            <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg max-w-xs text-center">
              <p className="mb-4 font-semibold">{error}</p>
              <button
                onClick={closePopup}
                className="bg-white text-red-700 font-semibold px-4 py-2 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEquiPage;
