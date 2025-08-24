// components/UserProfile.jsx
import React, { useEffect, useState } from "react";

const UserProfile = ({ onClose }) => {
  const [user, setUser] = useState(null); // null indicates loading

  useEffect(() => {
    // Mock fetch (replace with actual API if needed)
    setTimeout(() => {
      setUser({
        name: "Aniket Bagul",
        email: "aniket@example.com",
        address: "123 Dream Street, Pune",
        role: "User",
      });
    }, 1000);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">👤 User Profile</h2>

        {!user ? (
          <p className="text-gray-600 text-center">Loading profile...</p>
        ) : (
          <div className="space-y-3">
            <p><span className="font-semibold text-gray-700">Name:</span> {user.name}</p>
            <p><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
            <p><span className="font-semibold text-gray-700">Address:</span> {user.address}</p>
            <p><span className="font-semibold text-gray-700">Role:</span> {user.role}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
