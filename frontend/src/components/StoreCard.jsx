import React, { useState } from "react";

const StoreCard = ({ store, userRating, onRate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRating, setSelectedRating] = useState(userRating || 0);

  const handleSave = () => {
    if (selectedRating >= 1 && selectedRating <= 5) {
      onRate(store.id, selectedRating); // Send rating to parent
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4 border border-indigo-100 transition hover:shadow-2xl hover:scale-[1.02] duration-300">
      <h2 className="text-2xl font-extrabold text-indigo-900 tracking-tight">{store.name}</h2>
      <p className="text-sm text-gray-600">{store.address}</p>
      <p className="text-sm text-gray-700">
        Overall Rating: <span className="font-semibold text-yellow-500">⭐ {store.averageRating}</span>
      </p>

      {!isEditing ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Your Rating: {userRating ? (
              <span className="text-yellow-500 font-medium">⭐ {userRating}</span>
            ) : (
              <span className="italic text-gray-400">Not rated</span>
            )}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition"
          >
            {userRating ? "Update Rating" : "Submit Rating"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Star selection UI */}
          <div className="flex gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                className={`text-3xl transition-transform duration-200 transform hover:scale-125 ${
                  star <= selectedRating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md text-sm font-semibold transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedRating(userRating || 0);
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 shadow-sm text-sm font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreCard;
