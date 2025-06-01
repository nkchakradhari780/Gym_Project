'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const AttendanceAdPage = () => {
  const [trainerAttendance, setTrainerAttendance] = useState([]);
  const [customerAttendance, setCustomerAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/owner/customer/attendance/list',
          { withCredentials: true }
        );
        if (response.data?.attendanceData) {
          setCustomerAttendance(
            response.data.attendanceData.map((d) => {
              const rec = d.attendance?.find((a) => new Date(a.date).toISOString().split('T')[0] === selectedDate);
              return {
                id: d.customerId,
                name: d.name,
                email: d.email,
                attendance: d.attendance || [],
                role: d.role,
                status: rec?.status || '',
                date: selectedDate,
                submitted: false,
              };
            })
          );
        } else setError('No customer data returned');
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTrainersList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/owner/trainer/attendance/list',
          { withCredentials: true }
        );
        if (response.data?.attendanceData) {
          setTrainerAttendance(
            response.data.attendanceData.map((d) => {
              const rec = d.attendance?.find((a) => new Date(a.date).toISOString().split('T')[0] === selectedDate);
              return {
                id: d.trainerId,
                name: d.name,
                email: d.email,
                attendance: d.attendance || [],
                role: d.role,
                status: rec?.status || '',
                date: selectedDate,
                submitted: false,
              };
            })
          );
        } else setError('No trainer data returned');
      } catch (error) {
        setError(error.message);
      }
    };

    if (selectedDate) {
      setLoading(true);
      Promise.all([fetchCustomerList(), fetchTrainersList()]).finally(() => setLoading(false));
    }
  }, [selectedDate]);

  const markAttendance = (id, status, type) => {
    const update = (list) => list.map((entry) => (entry.id === id ? { ...entry, status } : entry));
    type === 'trainer'
      ? setTrainerAttendance((prev) => update(prev))
      : setCustomerAttendance((prev) => update(prev));
  };

  const submitAttendance = async (list, url, setList, label) => {
    try {
      for (const item of list) {
        await axios.post(
          url,
          { email: item.email, date: selectedDate, status: item.status || 'Absent' },
          { withCredentials: true }
        );
      }
      setList((prev) => prev.map((entry) => ({ ...entry, submitted: true })));
      alert(`${label} attendance successfully submitted!`);
    } catch (err) {
      alert(`Error submitting ${label.toLowerCase()} attendance.`);
    }
  };

  const renderTable = (data, type) => (
    <div className="overflow-x-auto mt-6 rounded-lg shadow border border-gray-800">
      <table className="min-w-full text-sm text-left bg-gray-900 text-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Present</th>
            <th className="px-4 py-3">Absent</th>
            <th className="px-4 py-3">View</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((person) => (
              <tr key={person.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2">{person.name}</td>
                <td className="px-4 py-2">{person.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => markAttendance(person.id, 'Present', type)}
                    disabled={person.submitted}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      person.status === 'Present' ? 'bg-green-600 opacity-70' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Present
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => markAttendance(person.id, 'Absent', type)}
                    disabled={person.submitted}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      person.status === 'Absent' ? 'bg-red-600 opacity-70' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    Absent
                  </button>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/dashboard-admin/attendance/singleAttendance/${person.id}`}>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-950 min-h-screen text-white mt-5">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Attendance Management</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
        />
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">Trainer Attendance</h2>
      {renderTable(trainerAttendance, 'trainer')}
      <button
        onClick={() =>
          submitAttendance(
            trainerAttendance,
            'http://localhost:3001/owner/trainer/attendence/mark',
            setTrainerAttendance,
            'Trainer'
          )
        }
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-3 rounded shadow"
      >
        Submit Trainer Attendance
      </button>

      <h2 className="text-xl font-semibold mt-10 mb-2">Customer Attendance</h2>
      {renderTable(customerAttendance, 'customer')}
      <button
        onClick={() =>
          submitAttendance(
            customerAttendance,
            'http://localhost:3001/owner/customer/attendance/mark',
            setCustomerAttendance,
            'Customer'
          )
        }
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-3 rounded shadow"
      >
        Submit Customer Attendance
      </button>
    </div>
  );
};

export default AttendanceAdPage;
