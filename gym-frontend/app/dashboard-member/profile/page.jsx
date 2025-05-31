'use client';

import Image from 'next/image';
import styles from '@/app/ui/dashboard/member-profile/member-profile.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const MemberProfile = () => {
  const { id } = useParams();

  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/customer/profile', {
                withCredentials: true,
            });

            if (response.data?.customer) {
                // console.log('Response Data Profile:', response.data.customer);
                setMemberDetails(response.data.customer);
            } else {
                console.error('No data returned from API');
                setError('No data returned from API');
            }
        } catch (error) {
            console.error('Error fetching member details:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchMemberDetails();
}, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Profile:</h1>
      <div className={styles.profile_card}>
        <Image 
          src={memberDetails?.imageUrl || '/images/noavtar.png'} 
          alt="Profile Picture"
          className={styles.profile_image} 
          width={150} 
          height={150} 
          style={{ objectFit: 'cover' }} 
        />
        <div className={styles.field}>
          <h2>Username:</h2>
          <p>{memberDetails?.fullName || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <h2>Email:</h2>
          <p>{memberDetails?.email || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <h2>Contact:</h2>
          <p>{memberDetails?.contact || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <h2>Address:</h2>
          <p>{memberDetails?.address || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <h2>Age:</h2>
          <p>{memberDetails?.age || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <h2>Gender:</h2>
          <p>{memberDetails?.gender || 'N/A'}</p>
        </div>
        <div className={styles.field}>
          <h2>Weight:</h2>
          <p>{memberDetails?.weight || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
