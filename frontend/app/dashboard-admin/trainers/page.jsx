'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainersList, setTrainersList] = useState([]);

  const toggleStatus = (id) => {
    setTrainersList((prevTrainers) =>
      prevTrainers.map((trainer) =>
        trainer._id === id ? { ...trainer, isActive: !trainer.isActive } : trainer
      )
    );
  };

  const deleteTrainer = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this trainer?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3001/owner/trainer/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setTrainersList((prevTrainers) =>
          prevTrainers.filter((trainer) => trainer._id !== id)
        );
        alert('Trainer deleted successfully');
      } else {
        alert('Failed to delete the trainer');
      }
    } catch (error) {
      console.error('Error deleting trainer', error.message);
      setError('Failed to delete trainer');
    }
  };

  useEffect(() => {
    const fetchTrainersList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/owner/trainer', {
          withCredentials: true,
        });

        if (response.data && response.data.trainers) {
          setTrainersList(response.data.trainers);
        } else {
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching trainer list', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainersList();
  }, []);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-950 min-h-[75vh] text-white mt-5">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold">Trainer Management</h1>
        <Link href="/dashboard-admin/trainers/add-trainer">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
            Add New
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-800">
        <table className="min-w-full text-sm text-left bg-gray-900 text-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainersList.length > 0 ? (
              trainersList.map((trainer) => (
                <tr
                  key={trainer._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Image
                      src="/images/noavtar.png"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {trainer.fullName}
                  </td>
                  <td className="px-4 py-2">{trainer.email}</td>
                  <td className="px-4 py-2">{trainer.age}</td>
                  <td className="px-4 py-2">{trainer.gender}</td>
                  <td className="px-4 py-2">{trainer.contact}</td>
                  <td className="px-4 py-2">{trainer.address}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleStatus(trainer._id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trainer.status ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {trainer.status ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link href={`/dashboard-admin/trainers/update/${trainer._id}`}>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                          View
                        </button>
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                        onClick={() => deleteTrainer(trainer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  No Trainers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerPage;
