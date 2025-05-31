"use client";

import Card from "../ui/dashboard/card/card";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState({
    totalManagers: 0,
    totalTrainers: 0,
    totalMembers: 0,
  });

  useEffect(() => {
    const fetchCountDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/owner/count", {
          withCredentials: true,
        });
        setCount({
          totalManagers: response.data.managerCount,
          totalTrainers: response.data.trainerCount,
          totalMembers: response.data.customerCount,
        });
        setError(null);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchCountDetails();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row mt-6 gap-6">
      {/* Main Content */}
      <div className="flex-[3] flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Managers" number={count.totalManagers} />
          <Card title="Total Trainers" number={count.totalTrainers} />
          <Card title="Total Members" number={count.totalMembers} />
        </div>
        <Transactions />
        {/* <Chart /> */}
      </div>

      {/* Rightbar */}
      <div className="flex-1 hidden xl:block">
        {/* <Rightbar /> */}
      </div>
    </div>
  );
};

export default DashboardAdmin;
