"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "@/app/ui/dashboard/equipments/singleEqui/singleEqui.module.css";

const UpdateEquipmentPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get equipment ID from URL

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    purchaseDate: "",
    purchasePrice: "",
    maintenanceDate: "",
    condition: "",
    location: "",
    status: "",
    description: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchEquipmentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/manager/equipment/${id}`,
          { withCredentials: true }
        );
        if (response.data) {
          setFormData({
            name: response.data.name || "",
            type: response.data.type || "",
            purchaseDate: response.data.purchaseDate || "", // Use purchaseDate here
            purchasePrice: response.data.purchasePrice || "",
            maintenanceDate: response.data.maintenanceDate || "",
            condition: response.data.condition || "",
            location: response.data.location || "",
            status: response.data.status || "",
            description: response.data.description || "",
            quantity: response.data.quantity || "",
          });
        }
      } catch (error) {
        setError("Error loading equipment data");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Id:",id);
      await axios.put(`http://localhost:3001/manager/equipment/${id}`, formData, {
        withCredentials: true,
      });
      router.push("/dashboard-manager/equipments"); // Redirect after update
    } catch (error) {
      setError("Failed to update equipment");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Equipment Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <label>Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            value={
              formData.purchaseDate ? formData.purchaseDate.split("T")[0] : ""
            }
            onChange={handleChange}
            required
          />
          <label>Purchase Price (₹)</label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
          />
          <label>Maintenance Date</label>
          <input
            type="date"
            name="maintenanceDate"
            value={
              formData.maintenanceDate
                ? formData.maintenanceDate.split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
          <label>Condition</label>
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
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
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.updateButton}>
            Update Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEquipmentPage;
