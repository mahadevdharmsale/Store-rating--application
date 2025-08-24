// src/components/StoreTable.jsx
import React, { useState } from "react";

const StoreTable = ({ stores, setRating }) => {
  const [ratings, setLocalRatings] = useState({});

  const handleRatingChange = (storeId, value) => {
    setLocalRatings((prev) => ({ ...prev, [storeId]: Number(value) }));
  };

  const submitRating = (storeId) => {
    if (!ratings[storeId]) {
      alert("Please select a rating first");
      return;
    }
    setRating(storeId, ratings[storeId]);
    alert("Rating submitted!");
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-blue-100">
          <th className="py-2 px-4 border">ID</th>
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">Address</th>
          <th className="py-2 px-4 border">Owner ID</th>
          <th className="py-2 px-4 border">Rating</th>
          <th className="py-2 px-4 border">Submit Rating</th>
        </tr>
      </thead>
      <tbody>
        {stores.map((store) => (
          <tr key={store.id} className="text-center">
            <td className="py-2 px-4 border">{store.id}</td>
            <td className="py-2 px-4 border">{store.name}</td>
            <td className="py-2 px-4 border">{store.address}</td>
            <td className="py-2 px-4 border">{store.owner_id}</td>
            <td className="py-2 px-4 border">
              <select
                value={ratings[store.id] || store.rating || ""}
                onChange={(e) => handleRatingChange(store.id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </td>
            <td className="py-2 px-4 border">
              <button
                onClick={() => submitRating(store.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StoreTable;
