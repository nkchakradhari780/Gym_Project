"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const SingleManagerPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState("/images/noavtar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    age: "",
    gender: "",
    salary: "",
    aadharNo: "",
    joiningDate: "",
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
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!id) return;

    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/owner/manager/${id}`, {
          withCredentials: true,
        });

        if (response.data) {
          setFormData({
            fullName: response.data.manager.fullName || "",
            email: response.data.manager.email || "",
            password: "",
            contact: response.data.manager.contact || "",
            address: response.data.manager.address || "",
            age: response.data.manager.age || "",
            gender: response.data.manager.gender || "",
            aadharNo: response.data.manager.aadharNo || "",
            salary: response.data.manager.salary || "",
            joiningDate: response.data.manager.joiningDate
              ? new Date(response.data.manager.joiningDate).toISOString().split("T")[0]
              : "",
          });
        }
      } catch (error) {
        setError("Error loading Manager Data");
      } finally {
        setLoading(false);
      }
    };

    fetchManagerDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/owner/manager/update", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        router.push("/dashboard-admin/manager");
        alert("Manager Updated Successfully");
      }
    } catch (error) {
      setError("Failed to update Manager");
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-gray-900 rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white">
            <Image src={selectedImage} alt="User Avatar" layout="fill" objectFit="cover" />
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Full Name", name: "fullName", type: "text", disabled: true },
            { label: "Email", name: "email", type: "email", disabled: true },
            { label: "Contact", name: "contact", type: "text", pattern: "\\d{10}", placeholder: "10-digit contact number" },
            { label: "Address", name: "address", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "Salary (₹)", name: "salary", type: "number", min: "0", step: "500" },
            { label: "Aadhar Number", name: "aadharNo", type: "text", pattern: "\\d{12}", placeholder: "12-digit Aadhar Number", disabled: true },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                pattern={field.pattern}
                min={field.min}
                step={field.step}
                disabled={field.disabled}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          {/* Password Field */}
          <div>
            <label className="block mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                pattern="(?=.*[a-zA-Z])(?=.*[0-9]).{8,}"
                title="Password must be at least 8 characters long and contain at least one letter and one number."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div>

          {/* Joining Date */}
          <div>
            <label className="block mb-1">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-2 px-4 rounded-lg"
            >
              Update Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleManagerPage;
