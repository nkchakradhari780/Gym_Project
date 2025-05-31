"use client";

import { useState } from "react";
import axios from "axios";
import styles from "@/app/ui/dashboard/equipments/addEqui/addEqui.module.css";
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
        "http://localhost:3001/manager/equipment/add",
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
      setSuccess(false); // Hide success message if there was an error
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
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Equipment ID <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />

            <label>
              Equipment Name <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>
              Type <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
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

            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />

            <label>
              Purchase Date <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
            />

            <label>
              Purchase Price (₹) <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="number"
              name="purchasePrice"
              min="0"
              value={formData.purchasePrice}
              onChange={handleChange}
              required
            />

            <label>Maintenance Date</label>
            <input
              type="date"
              name="maintenanceDate"
              value={formData.maintenanceDate}
              onChange={handleChange}
            />

            <label>
              Condition <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Condition
              </option>
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>

            <label>
              Location <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
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

            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Out of Order">Out of Order</option>
            </select>

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <label>
              Quantity <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            <Link href="/dashboard-admin/equipments">
              <button type="button" className={styles.cancelButton}>
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </div>

      {/* Popup for success */}
      {success && (
        <div className={styles.popup} onClick={closePopup}>
          <p>Equipment added successfully!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}

      {/* Popup for error */}
      {error && (
        <div className={styles.popup} onClick={closePopup}>
          <p>{error}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddEquiPage;
