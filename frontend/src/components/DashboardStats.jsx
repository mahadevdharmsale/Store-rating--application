// src/components/DashboardStats.jsx
import React from "react";

const DashboardStats = ({ users, stores, ratings }) => {
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(2)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-blue-600 mb-2">Total Users</h2>
        <p className="text-3xl font-extrabold">{users.length}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-blue-600 mb-2">Total Stores</h2>
        <p className="text-3xl font-extrabold">{stores.length}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-blue-600 mb-2">Average Rating</h2>
        <p className="text-3xl font-extrabold">{avgRating}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
