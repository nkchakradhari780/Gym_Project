"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/ui/dashboard/managers/addManager/addManager.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddManagerPage = () => {
  const router = useRouter();
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
    salary: "",
    joinDate: "",
    aadharNo: "", // Add aadharNo in formData
    status: "active",
    managerId: "",
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
      age,
      gender,
      salary,
      joinDate,
      aadharNo,
      status,
      managerId,
    } = formData;

    try {
      const response = await axios.post(
        "http://localhost:3001/owner/manager/create",
        {
          fullName,
          email,
          password,
          contact,
          address,
          age,
          gender,
          salary,
          joinDate,
          aadharNo, // Include aadharNo in the request
          status,
          managerId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(formData)
      router.push("/dashboard-admin/manager");
      setSuccess(true);
      setError("");
      alert("Manager Added successfully");
    } catch (error) {
      setError("Error adding manager");
      setSuccess(false);
      alert("Failed to add Manager");
      console.error("Error adding manager", error.message);
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
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
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
            <div className={styles.dateTotalContainer}>
              <label htmlFor="joinDate">Joining Date:</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                required
              />
            </div>

            <label>
              Aadhar Number <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              pattern="\d{12}" // Validates a 12-digit Aadhar number
              placeholder="12-digit Aadhar Number"
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddManagerPage;
