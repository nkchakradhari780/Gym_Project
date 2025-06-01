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
          totalManagers: response.data.counts.manager,
          totalTrainers: response.data.counts.trainer,
          totalMembers: response.data.counts.member,
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

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-20 text-lg font-medium">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-20 text-lg font-medium">
        {error}
      </p>
    );

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 px-4 sm:px-6 md:px-8 py-6 overflow-hidden">
      {/* Left main content */}
      <div className="flex-1 flex flex-col gap-8 overflow-hidden ">
        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            <Card title="Total Managers" number={count.totalManagers} />
            <Card title="Total Trainers" number={count.totalTrainers} />
            <Card title="Total Members" number={count.totalMembers} />
          </div>
        </div>

        {/* Transactions */}
        <Transactions />

        {/* Chart */}
        <Chart />
      </div>

      {/* Rightbar */}
      <div className="hidden xl:block flex-shrink-0 w-96 min-w-[24rem]">
        {/* <Rightbar /> */}
      </div>
    </div>
  );
};

export default DashboardAdmin;
