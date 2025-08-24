import React, { useState, useEffect } from "react";
import api from "../api";

const eyeOpenIcon =
  "https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png";
const eyeClosedIcon =
  "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png";

const ProfileCard = ({ userId, name, email, role, onSuccess, onError }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    console.log("ProfileCard loaded:", { userId, name, email, role });
  }, [userId, name, email, role]);

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      onError("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      onError(
        "Password must be 8–16 characters, include 1 uppercase & 1 special character."
      );
      return;
    }

    try {
      await api.put(`/user/${userId}/update-password`, { password });
      onSuccess();
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      onError("Failed to update password.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-12 px-4">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-white/50 backdrop-blur-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
          👤 Your Profile
        </h2>

        <div className="mb-8 text-base text-gray-800 space-y-2">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              🔑 New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <img
                src={showPassword ? eyeOpenIcon : eyeClosedIcon}
                alt="Toggle visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                className="w-5 h-5 absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
              🔐 Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <img
                src={showConfirmPassword ? eyeOpenIcon : eyeClosedIcon}
                alt="Toggle visibility"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="w-5 h-5 absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            🔄 Update Password
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6 text-center">
          Must be 8–16 characters, including at least one uppercase and one special character.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
