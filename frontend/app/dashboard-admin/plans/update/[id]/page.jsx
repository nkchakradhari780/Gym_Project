"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/ui/dashboard/plans/singlePlan/singlePlan.module.css";
import axios from "axios";

const SinglePlanPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    planID: "",
    planName: "",
    level: "",
    price: "",
    category: "",
    duration: "",
    facilities: [],
    createDate: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/owner/plan/${id}`,
          { withCredentials: true }
        );
        console.log("Plans Data",response.data)
        if (response.data) {
          setFormData({
            planID: response.data.planID || "",
            planName: response.data.planName || "",
            level: response.data.level || "",
            price: response.data.price || "",
            category: response.data.category || "",
            duration: response.data.duration || "",
            facilities: response.data.facilities || [],
            createDate: response.data.createDate || "",
          });
        }
      } catch (error) {
        console.error("Error fetching plan data:", error.message);
        setError("Failed to load plan data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlanData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFacilitiesChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const facilities = checked
        ? [...prevData.facilities, value]
        : prevData.facilities.filter((facility) => facility !== value);
      return { ...prevData, facilities };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/owner/plans/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setSuccess(true);
      setError("");
      alert("Plan updated successfully");
      router.push("/dashboard-admin/plans");
    } catch (error) {
      setError("Error updating plan");
      setSuccess(false);
      alert("Failed to update plan");
      console.error("Error updating plan:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2 className={styles.heading}>Update Plan</h2>
        <Link href="/dashboard-admin/plans">
          <button className={styles.backButton}>Back</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Plan ID Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Plan ID <span className={styles.requiredStar}>*</span>
          </label>
          <input
            type="text"
            name="planID"
            className={styles.inputField}
            value={formData.planID}
            onChange={handleChange}
            required
            disabled
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Plan Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            type="text"
            name="planName"
            className={styles.inputField}
            value={formData.planName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Level <span className={styles.requiredStar}>*</span>
          </label>
          <select
            name="level"
            className={styles.selectField}
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Level
            </option>
            <option value="beginner">Beginner</option>
            <option value="medium">Medium</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Price (₹) <span className={styles.requiredStar}>*</span>
          </label>
          <input
            type="number"
            name="price"
            className={styles.inputField}
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="100"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Category <span className={styles.requiredStar}>*</span>
          </label>
          <select
            name="category"
            className={styles.selectField}
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
            <option value="endurance">Endurance</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Duration (months) <span className={styles.requiredStar}>*</span>
          </label>
          <input
            type="number"
            name="duration"
            className={styles.inputField}
            value={formData.duration}
            onChange={handleChange}
            min="1"
            step="1"
            required
          />
        </div>

        {/* Facilities checkboxes */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Facilities <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.facilitiesContainer}>
            {[
              "gym",
              "pool",
              "changing room",
              "personal trainer",
              "group classes",
            ].map((facility) => (
              <div key={facility} className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id={facility}
                  name="facilities"
                  value={facility}
                  checked={formData.facilities.includes(facility)}
                  onChange={handleFacilitiesChange}
                  className={styles.checkbox}
                />
                <label htmlFor={facility} className={styles.checkboxLabel}>
                  {facility.charAt(0).toUpperCase() +
                    facility.slice(1).replace(/_/g, " ")}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Date Created</label>
          <input
            type="date"
            name="createdAt"
            className={styles.inputField}
            value={formData.createDate
                ? formData.createDate.split("T")[0]
                : ""
            }
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Update
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Plan updated successfully!</p>}
    </div>
  );
};

export default SinglePlanPage;
