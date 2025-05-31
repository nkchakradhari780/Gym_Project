'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const PlanPage = () => {
  const [planList, setPlanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlansList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/owner/plans', {
          withCredentials: true,
        });
        if (response.data && response.data.plans) {
          setPlanList(response.data.plans);
        } else {
          setError('Error fetching plans list');
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
    const isConfirmed = window.confirm('Are you sure you want to delete this plan?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3001/owner/plans/${planId}`, {
        withCredentials: true,
      });
      const updatedPlans = planList.filter((_, i) => i !== index);
      setPlanList(updatedPlans);
      alert('Plan deleted successfully');
    } catch (error) {
      alert('Failed to delete plan. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          {/* <input
            type="text"
            placeholder="Search for plans..."
            className="w-1/3 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          /> */}
          <Link href="/dashboard-admin/plans/add-plan">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
              Add New
            </button>
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Pricing Plans</h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planList.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-100">{plan.planName}</h3>
              <p className="text-sm text-gray-400 mb-2">Plan ID: {plan.planID}</p>
              <p className="text-sm text-gray-400">Level: {plan.level}</p>
              <p className="text-lg font-bold text-gray-200 mt-2">
                ₹{plan.price} </p>
              <p className="text-sm text-gray-400 mt-1">Duration: {plan.duration} Months</p>
              <p className="text-sm text-gray-400 mt-1">Category: {plan.category}</p>
              <p className="text-sm text-gray-400 mt-1">
                Date Created: {new Date(plan.dateCreated).toLocaleDateString()}
              </p>

              <ul className="mt-4">
                {plan.facilities.map((facility, i) => (
                  <li
                    key={i}
                    className={`text-sm ${
                      plan.isDisabled && plan.isDisabled.includes(i)
                        ? 'text-red-500 line-through'
                        : 'text-gray-300'
                    }`}
                  >
                    {facility}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mt-6">
                <Link href={`/dashboard-admin/plans/update/${plan._id}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 transition">
                    Update
                  </button>
                </Link>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 transition"
                  onClick={() => handleDelete(index, plan._id)}
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
