"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SingleUserPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState("/images/noavtar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    weight: "",
    age: "",
    startDate: "",
    gender: "",
    isActive: "",
  });

  // Handle image change for preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Fetch user details on component load
  useEffect(() => {
    if (!id) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/manager/customer/${id}`,
          { withCredentials: true }
        );
        console.log(response.data.customer)
        if (response.data.customer) {
          const customer = response.data.customer;

          setFormData({
            fullName: customer.fullName || "",
            email: customer.email || "",
            password: "", // Password should not be prefilled for security
            contact: customer.contact || "",
            address: customer.address || "",
            weight: customer.weight || "",
            age: customer.age || "",
            startDate: customer.startDate || "",
            gender: customer.gender || "",
            isActive: customer.isActive ? "true" : "false",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Handle form field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/manager/customer/update`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Customer updated successfully");
        router.push("/dashboard-manager/users");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Failed to update customer");
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
        <div className={styles.imgContainer}>
          <Image
            src={selectedImage}
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.uploadInput}
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.customFileUpload}>
          Choose File
        </label>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Full Name <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>
              Email <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                pattern="(?=.*[a-zA-Z])(?=.*[0-9]).{8,}"
                title="Password must be at least 8 characters long and contain at least one letter and one number."
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>

            <label>
              Contact <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              pattern="\d{10}"
              title="Enter a 10-digit phone number"
              required
            />

            <label>
              Address <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>
              Gender <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.1"
            />

            <label>Is Active?</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <button type="submit" className={styles.updateButton}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
