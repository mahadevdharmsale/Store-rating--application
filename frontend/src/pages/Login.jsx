import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { id, name, role } = res.data.user;

      localStorage.setItem("userId", id);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/admin");
      else if (role === "owner") navigate("/owner");
      else if (role === "user") navigate("/user");
      else {
        setError("Unknown role. Please contact support.");
        localStorage.clear();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative"
    >
      {/* Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-6 w-full flex justify-center z-20"
      >
        <div className="text-center">
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-xl"
          >
            Store Rating App
          </motion.h1>
          <p className="text-sm md:text-base text-gray-300 mt-1 font-medium tracking-wide">
            Share experiences, rate smartly!
          </p>
        </div>
      </motion.div>

      {/* Login Form */}
      <motion.form
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        onSubmit={handleSubmit}
        className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md z-10 border border-gray-700 transform hover:scale-105 hover:shadow-indigo-500 transition duration-300"
      >
        <motion.h2
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-2xl font-bold text-center text-indigo-400 mb-6"
        >
          Welcome Back 
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mb-4 text-center"
          >
            {error}
          </motion.div>
        )}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-400 text-sm mb-4 text-center"
          >
            Logging in...
          </motion.div>
        )}

        {/* Email Field */}
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mb-4">
          <label className="block text-gray-300 mb-1 font-medium">Email</label>
          <div className="flex items-center border border-gray-600 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-700">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              required
              className="w-full outline-none bg-transparent text-white placeholder-gray-400"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mb-6">
          <label className="block text-gray-300 mb-1 font-medium">Password</label>
          <div className="flex items-center border border-gray-600 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-700">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              required
              className="w-full outline-none bg-transparent text-white placeholder-gray-400"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Redirect */}
        <motion.p
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-center text-sm text-gray-400 mt-4"
        >
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-indigo-400 font-semibold hover:underline"
          >
            Sign up
          </button>
        </motion.p>
      </motion.form>
    </motion.div>
  );
};

export default Login;
