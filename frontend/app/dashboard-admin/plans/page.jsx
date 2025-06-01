"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const PlanPage = () => {
  const [planList, setPlanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlansList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/owner/plans", {
          withCredentials: true,
        });
        if (response.data && response.data.plans) {
          setPlanList(response.data.plans);
        } else {
          setError("Error fetching plans list");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlansList();
  }, []);

  const handleDelete = async (index, planId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this plan?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3001/owner/plans/${planId}`, {
        withCredentials: true,
      });
      const updatedPlans = planList.filter((_, i) => i !== index);
      setPlanList(updatedPlans);
      alert("Plan deleted successfully");
    } catch (error) {
      alert("Failed to delete plan. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] bg-gray-950 text-gray-100 px-4 py-10 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold border-b-4 border-blue-600 inline-block pb-1">
            Pricing Plans
          </h1>
          <Link href="/dashboard-admin/plans/add-plan">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-300">
              + Add New
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {planList.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-white">
                {plan.planName}
              </h2>
              <p className="text-sm text-gray-400">Plan ID: {plan.planID}</p>
              <p className="text-sm text-gray-400">Level: {plan.level}</p>
              <p className="text-xl font-bold text-white mt-2">₹{plan.price}</p>
              <p className="text-sm text-gray-400 mt-1">
                Duration: {plan.duration} Months
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Category: {plan.category}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Created: {new Date(plan.dateCreated).toLocaleDateString()}
              </p>

              <ul className="mt-4 space-y-1">
                {plan.facilities.map((facility, i) => (
                  <li
                    key={i}
                    className={`text-sm ${
                      plan.isDisabled && plan.isDisabled.includes(i)
                        ? "text-red-500 line-through"
                        : "text-gray-300"
                    }`}
                  >
                    {facility}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mt-6">
                <Link href={`/dashboard-admin/plans/update/${plan._id}`}>
                  <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md shadow transition duration-300">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(index, plan._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md shadow transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
