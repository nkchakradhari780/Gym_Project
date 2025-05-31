"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/managers/addManager/addManager.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const SingleManagerPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState('/images/noavtar.png');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    age: '',
    gender: '',
    speciality: '',
    salary: '',
    aadharNo: '',
    joiningDate: '',
    // managerID: '', // Initialize managerID in state
  });

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

  useEffect(() => {
    if (!id) return;
    console.log(id);

    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/owner/manager/${id}`,
          { withCredentials: true }
        );

        console.log('manager details', response.data.manager)

        if (response.data) {
          setFormData({
            fullName: response.data.manager.fullName || "",
            email: response.data.manager.email || "",
            password: "", // Set password empty as it's not being fetched
            contact: response.data.manager.contact || "",
            address: response.data.manager.address || "",
            age: response.data.manager.age || "",
            gender: response.data.manager.gender || "",
            status: response.data.manager.status || 'active',
            aadharNo: response.data.manager.aadharNo || '',
            salary: response.data.manager.salary || "",
            joiningDate: response.data.manager.joiningDate
              ? new Date(response.data.manager.joiningDate).toISOString().split('T')[0]
              : "", // Ensure the date is in 'YYYY-MM-DD' format

            // managerID: response.data.manager.managerID || "",
          });
        }
      } catch (error) {
        setError("Error loading Manager Data");
      } finally {
        setLoading(false);
      }
    };
    fetchManagerDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(id);

    try {
      const response = await axios.post(
        'http://localhost:3001/owner/manager/update',
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push('/dashboard-admin/manager');
        alert("Manager Updated Successfully");
      }
    } catch (error) {
      setError("Failed to update Manager");
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
            <label>Full Name <span className={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled
            />
            <label>Email <span className={styles.requiredStar}>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
            <label>Contact <span className={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="contact"
              pattern="\d{10}"
              placeholder="10-digit contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <label>Address <span className={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label>Age<span className={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <label>Salary(₹) <span className={styles.requiredStar}>*</span></label>
            <input
              type="number"
              name="salary"
              min="0"
              step="500"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <label>Aadhar Number <span className={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              pattern="\d{12}"
              placeholder="12-digit Aadhar Number"
              required
              disabled
            />
            <div className={styles.dateTotalContainer}>
            <div>
                <label htmlFor="joiningDate">Joining Date</label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className={styles.updateButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleManagerPage;
