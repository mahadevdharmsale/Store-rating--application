import React from "react";

const RatingsList = ({ ratings }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">📝 User Ratings</h3>
      {ratings.length === 0 ? (
        <p className="text-gray-500">No ratings yet.</p>
      ) : (
        <ul className="space-y-3">
          {ratings.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <span className="font-medium">{item.username}</span>
              <span className="text-yellow-600 font-bold">
                {item.rating} / 5
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RatingsList;
