'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/my-members/my-members.module.css';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

const MyMembersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/trainer/customer",
          {
            withCredentials: true,
          }
        );


        if (response.data && response.data.customers) {
          console.log("Response Data:", response.data.customers);
          setUsersList(response.data.customers);
        } else {
          console.log("No data returned from API");
          setError("No Data returned from API");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Plan</th>
            {/* <th>Purchase Date</th> */}
            <th>Age</th>
            <th>Weight (kg)</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((member) => (
            <tr key={member._id}>
              <td>
                <div className={styles.member}>
                  <Image
                    src="/images/noavtar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.memberImage}
                  />
                  {member.fullName}
                </div>
              </td>
              <td>{member.joinedPlans && member.joinedPlans.length > 0 ? (
                member.joinedPlans.map((plan,index) =>(
                  <span key={index}>
                    {plan.planName}
                    {index < member.joinedPlans.length - 1 ? "," : ""}
                  </span>
                ))
              ) : (
                "No Plans"
              )}
              </td>
              {/* <td>{member.startDate}</td> */}
              <td>{member.age}</td>
              <td>{member.weight}</td>
              <td>{member.email}</td>
              <td>{member.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default MyMembersPage;
