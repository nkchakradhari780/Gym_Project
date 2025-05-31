"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

const AddUserPage = () => {
  const [selectedImage, setSelectedImage] = useState("/images/noavatar.png");
  const [showPassword, setShowPassword] = useState(false);
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
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      fullName,
      email,
      password,
      contact,
      address,
      weight,
      age,
      startDate,
      gender,
    } = formData;

    try {
      console.log("Creating new Member with", formData);

      const response = await axios.post(
        "http://localhost:3001/owner/customer/create",
        {
          fullName,
          email,
          password,
          contact,
          address,
          weight,
          age,
          startDate,
          gender,
        },
        {
          withCredentials: true,
        }
      ); // Adjust API URL if needed
      alert("User added successfully");
      setSuccess(true);
      setError("");
    } catch (error) {
      setError("Error adding user")
      setSuccess(false)
      console.error("Error adding user:", error.message);
      alert("Failed to add user");
    }
  };

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
              placeholder="Full Name"
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
            <label>
              Password <span className={styles.requiredStar}>*</span>
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
              pattern="\d{10}"
              placeholder="10-digit contact number"
              value={formData.contact}
              onChange={handleChange}
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
              Age <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="number"
              name="age"
              min="0"
              placeholder="Enter age"
              value={formData.age}
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
            <label>
              Weight (kg) <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="number"
              name="weight"
              min="0"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <label>
              Start Date <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            <label>Is Active?</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <button type="submit" className={styles.updateButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
