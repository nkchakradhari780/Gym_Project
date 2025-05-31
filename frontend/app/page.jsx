"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "@/app/ui/login/login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🆕 loading state
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // start loading

    try {
      console.log('Attempting login with:', { email, password });

      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      }, {
        withCredentials: true,
      });

      const userRole = response.data.user.role;
      console.log('Login successful:', userRole);
      router.push(`/dashboard-${userRole}`);

    } catch (err) {
      setError('Invalid login credentials');
      console.error('Login failed:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Login</h1>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        {/* Password Input */}
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Login Button */}
        <div className={styles.buttonWrapper}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
