'use client';

import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import Image from 'next/image';
import styles from '@/app/ui/dashboard/manager-profile/manager-profile.module.css';

const ManagerProfile = () => {
  const [managerDetails, setManagerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/manager', {
          withCredentials: true,  // Send cookies with the request if needed
        });

        if (response.data) {
          console.log('Response Data:', response.data); // Logs data from the backend
          setManagerDetails(response.data.manager);
        } else {
          console.error('No data returned from API');
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching manager details:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManagerDetails();
  }, []);

  // Monitor managerDetails state change
  useEffect(() => {
    if (managerDetails) {
      console.log('Manager Details:', managerDetails); // This will run when managerDetails updates
    }
  }, [managerDetails]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!managerDetails) {
    return <p>No manager details found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Profile:</h1>
      <div className={styles.profile_card}>
        <Image 
          src={'/images/noavtar.png'} 
          alt='Profile Image'
          className={styles.profile_image} 
          width={150} 
          height={150} 
          objectFit="cover" 
        />
        <div className={styles.field}>
          <h2>Name</h2>
          <p>{managerDetails.fullName}</p>
        </div>
        <div className={styles.field}>
          <h2>Email:</h2>
          <p>{managerDetails.email}</p>
        </div>
        <div className={styles.field}>
          <h2>Contact:</h2>
          <p>{managerDetails.contact}</p>
        </div>
        <div className={styles.field}>
          <h2>Address:</h2>
          <p>{managerDetails.address}</p>
        </div>
        <div className={styles.field}>
          <h2>Age:</h2>
          <p>{managerDetails.age}</p>
        </div>
        <div className={styles.field}>
          <h2>Gender:</h2>
          <p>{managerDetails.gender}</p>
        </div>
        <div className={styles.field}>
          <h2>Salary:</h2>
          <p>{managerDetails.salary}</p>
        </div>
        <div className={styles.field}>
          <h2>Join Date:</h2>
          <p>{new Date(managerDetails.joinDate).toLocaleDateString()}</p>
        </div>
        <div className={styles.field}>
          <h2>Manager ID:</h2>
          <p>{managerDetails.managerId}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
