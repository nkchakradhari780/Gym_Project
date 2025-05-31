"use client";

import { useState,useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/trainers/singleTrainer/singleTrainer.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const SingleTrainerPage = () => {
  const router = useRouter();
  const {id} = useParams();

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
    joiningDate: '',
    status: 'active', // Default status
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(() => {
    if(!id) return;
    console.log(id)
    const fetchTrainerDetails = async () =>{
      try{
        const response = await axios.get(
          `http://localhost:3001/manager/trainer/${id}`,
          { withCredentials: true}
        );

        console.log("Name of Trainer ", response.data);

        if(response.data){
          setFormData({
            fullName: response.data.fullName || "",
            email: response.data.email || "",
            password: "",
            contact: response.data.contact || "",
            address: response.data.address || "",
            age: response.data.age || "",
            joiningDate: response.data.joiningDate
            ? new Date(response.data.joiningDate).toISOString().split('T')[0]
            : "", // Ensure the date is in 'YYYY-MM-DD' format            gender: response.data.gender || "",
            speciality: response.data.speciality || "",
            status: response.data.status || 'active', // Include status
            salary: response.data.salary || "",
          })
        }
      } catch (error) {
        setError("error loading Trainer data")

      } finally {
        setLoading(false)
      }
    };

    fetchTrainerDetails();
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      console.log("updating")
      const response = await axios.put(
        `http://localhost:3001/manager/trainer/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      if(response.status === 200) {
        console.log("updated successfully")
        router.push('/dashboard-manager/trainers')
      }
    } catch (error) {
      console.error("Error Updating Trainer:", error)
      setError("Failed to update trainer")
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
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
            <label>Username <span className={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label>Email <span className={styles.requiredStar}>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
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
            <label>Gender <span className={styles.requiredStar}>*</span></label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>
                Choose Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label>Speciality <span className={styles.requiredStar}>*</span></label>
            <select name="speciality" value={formData.speciality} onChange={handleChange} required>
              <option value="" disabled>
                Speciality
              </option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </select>
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
            
            <label>Status <span className={styles.requiredStar}>*</span></label>
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
                Update
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleTrainerPage;
