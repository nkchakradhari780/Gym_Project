"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "@/app/ui/dashboard/equipments/equipments.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const EquipmentPage = () => {
  const [equipmentsList, setEquipmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentsList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/trainer/equipment",
          { withCredentials: true }
        );
        if (response.data && response.data.equipments) {
          console.log("Response Data:", response.data.equipments);
          setEquipmentsList(response.data.equipments);
        } else {
          console.log("No data returned from API");
          setError("No data returned from API");
        }
      } catch (error) {
        console.error("Error fetching Equipments list", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentsList();
  }, []);

//   const toggleStatus = async (id, currentStatus) => {
//     const updatedStatus = !currentStatus;
//     try {
//       setEquipmentsList((prevEquipments) =>
//         prevEquipments.map((equipment) =>
//           equipment._id === id
//             ? { ...equipment, status: updatedStatus }
//             : equipment
//         )
//       );
//       await axios.put(
//         `http://localhost:3001/trainer/equipment/${id}`,
//         { status: updatedStatus },
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.error("Failed to update status", error.message);
//       setError("Failed to update status");
//       setEquipmentsList((prevEquipments) =>
//         prevEquipments.map((equipment) =>
//           equipment._id === id
//             ? { ...equipment, status: currentStatus }
//             : equipment
//         )
//       );
//     }
//   };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for equipment..." /> */}
        {/* <Link href="/dashboard-trainer/equipments/add-equipment">
          <button className={styles.addButton}>Add New</button>
        </Link> */}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Purchased On</th>
            <th>Price(₹)</th>
            <th>Quantity</th>
            <th>Total(₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {equipmentsList.length > 0 ? (
            equipmentsList.map((equipment) => (
              <tr key={equipment._id}>
                <td>
                  <div className={styles.equipment}>
                    <Image
                      src="/images/noequipment.jpg"
                      alt="Equipment Image"
                      width={40}
                      height={40}
                      className={styles.equipmentImage}
                    />
                    {equipment.name}
                  </div>
                </td>
                <td>{equipment.id}</td>
                <td>{new Date(equipment.purchasedOn).toLocaleDateString()}</td>
                <td>{equipment.purchasePrice}</td>
                <td>{equipment.quantity}</td>
                <td>{equipment.purchasePrice * equipment.quantity}</td>
                <td>
                  <button
                    className={`${styles.button} ${
                      equipment.status ? styles.active : styles.inactive
                    }`}
                    // onClick={() =>
                    //   toggleStatus(equipment._id, equipment.status)
                    // }
                  >
                    {equipment.status ? "Available" : "Unavailable"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No Equipments found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default EquipmentPage;
