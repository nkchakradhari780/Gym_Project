"use client";

import { useState } from "react";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const AddTrainerPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState("/images/noavtar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    age: "",
    gender: "",
    speciality: "",
    salary: "",
    joiningDate: "",
    status: "active", // default status for select
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/owner/trainer/create", formData, {
        withCredentials: true,
      });
      router.push("/dashboard-admin/trainers");
      alert("Trainer added successfully");
    } catch (error) {
      console.error("Error adding Trainer:", error.message);
      alert("Failed to add trainer");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10 text-white">
      <div className="bg-gray-950 rounded-lg shadow-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={selectedImage}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Upload Avatar
          </label>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 text-sm sm:text-base"
          autoComplete="off"
        >
          {/* Utility to avoid repeating classes */}
          {/** Labels and inputs follow consistent style **/}

          <div>
            <label className="block mb-1 font-semibold">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                pattern="(?=.*[a-zA-Z])(?=.*[0-9]).{8,}"
                title="Password must contain at least 1 letter and 1 number."
                className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-300 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Contact <span className="text-red-500">*</span>
            </label>
            <input
              name="contact"
              type="text"
              pattern="\d{10}"
              placeholder="10-digit number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter address"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              name="age"
              type="number"
              min={18}
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Speciality <span className="text-red-500">*</span>
            </label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select speciality
              </option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Salary (₹) <span className="text-red-500">*</span>
            </label>
            <input
              name="salary"
              type="number"
              min={0}
              step={500}
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter salary"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-600 py-3 text-lg font-semibold hover:bg-green-700 transition"
          >
            Add Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainerPage;
