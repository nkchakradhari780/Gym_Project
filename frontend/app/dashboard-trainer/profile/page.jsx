'use client';

import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import Image from 'next/image';
import styles from '@/app/ui/dashboard/manager-profile/manager-profile.module.css';

const ManagerProfile = () => {
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trainer', {
          withCredentials: true,  // Send cookies with the request if needed
        });

        if (response.data) {
          console.log('Response Data:', response.data); // Logs data from the backend
          setTrainerDetails(response.data.trainer);
        } else {
          console.error('No data returned from API');
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching Trainer details:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerDetails();
  }, []);

  // Monitor managerDetails state change
  useEffect(() => {
    if (trainerDetails) {
      console.log('Manager Details:', trainerDetails); // This will run when managerDetails updates
    }
  }, [trainerDetails]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!trainerDetails) {
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
          <p>{trainerDetails.fullName}</p>
        </div>
        <div className={styles.field}>
          <h2>Email:</h2>
          <p>{trainerDetails.email}</p>
        </div>
        <div className={styles.field}>
          <h2>Contact:</h2>
          <p>{trainerDetails.contact}</p>
        </div>
        <div className={styles.field}>
          <h2>Address:</h2>
          <p>{trainerDetails.address}</p>
        </div>
        <div className={styles.field}>
          <h2>Age:</h2>
          <p>{trainerDetails.age}</p>
        </div>
        <div className={styles.field}>
          <h2>Gender:</h2>
          <p>{trainerDetails.gender}</p>
        </div>
        <div className={styles.field}>
          <h2>Salary:</h2>
          <p>{trainerDetails.salary}</p>
        </div>
        <div className={styles.field}>
          <h2>Join Date:</h2>
          <p>{new Date(trainerDetails.joiningDate).toLocaleDateString()}</p>
        </div>
        <div className={styles.field}>
          <h2>Trainer ID:</h2>
          <p>{trainerDetails.managerId}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
