"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/ui/dashboard/trainers/addTrainer/addTrainer.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const AddTrainerPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState("/images/noavtar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    age: "",
    gender: "",
    speciality: "",
    salary: "",
    joiningDate: "",
    isActive: true, // Default to true for new trainers
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

    setFormData({
      ...formData,
      [name]: name === "isActive" ? JSON.parse(value) : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      fullName,
      email,
      password,
      contact,
      address,
      age,
      gender,
      speciality,
      salary,
      joiningDate,
      status,
    } = formData;

    try {
      console.log("Creating new Trainer with", formData);

      const response = await axios.post(
        "http://localhost:3001/owner/trainer/create",
        {
          fullName,
          email,
          password,
          contact,
          address,
          age,
          gender,
          speciality,
          salary,
          joiningDate,
          status,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/dashboard-admin/trainers");
      alert("Trainer added successfully");
      setSuccess(true);
      setError("");
    } catch (error) {
      setError("Error adding trainer");
      setSuccess(false);
      console.error("Error adding Trainer:", error.message);
      alert("Failed to add trainer");
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
              min="18"
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
              Speciality <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Speciality
              </option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </select>
            <label>
              Salary(₹) <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="number"
              name="salary"
              min="0"
              step="500"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <label>
              Joining Date <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
            <label>
              Status <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
            <button type="submit" className={styles.updateButton}>
              Add Trainer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrainerPage;
