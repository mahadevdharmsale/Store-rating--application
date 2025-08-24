import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import FilterComponent from "../components/FilterComponent";

const OwnerDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [minRating, setMinRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = {
      userId: localStorage.getItem("userId"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
      storeId: localStorage.getItem("storeId"), // you must set this after login
    };
    setUser(storedUser);
  }, []);

  // ✅ Fetch ratings for this owner's store
  useEffect(() => {
    if (!user?.storeId) return;

    const fetchRatings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/ratings/store/${user.storeId}`
        );
        setRatings(res.data || []);
      } catch (err) {
        console.error("Error fetching ratings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user?.storeId]);

  const handleSuccess = () => alert("Password updated successfully!");
  const handleError = (msg) => alert(msg);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  // ✅ Apply filters
  const filteredRatings = ratings.filter((r) => r.rating >= minRating);

  // ✅ Sorting logic
  const sortedRatings = [...filteredRatings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // ✅ Average rating
  const averageRating =
    filteredRatings.reduce((sum, r) => sum + r.rating, 0) /
    (filteredRatings.length || 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">
      {/* Top Centered Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Owner Dashboard</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Hello, <span className="font-semibold">{user.name}</span>. Manage your
          store & view ratings below.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {showProfile ? "Hide Profile" : "View Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Profile Section */}
      {showProfile && (
        <div className="flex justify-center pb-10">
          <ProfileCard
            userId={user.userId}
            name={user.name}
            email={user.email}
            role={user.role}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      )}

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl shadow text-center">
          <p className="text-sm font-semibold">Average Rating</p>
          <p className="text-3xl font-bold mt-1">⭐ {averageRating.toFixed(1)}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow text-center">
          <p className="text-sm font-semibold">Total Reviews</p>
          <p className="text-3xl font-bold mt-1">{filteredRatings.length}</p>
        </div>
        <div className="bg-indigo-100 text-indigo-800 p-6 rounded-xl shadow text-center">
          <p className="text-sm font-semibold">Positive Feedback</p>
          <p className="text-3xl font-bold mt-1">
            {Math.round(
              (filteredRatings.filter((r) => r.rating >= 4).length /
                (filteredRatings.length || 1)) *
                100
            )}
            %
          </p>
        </div>
      </div>

      {/* Filter Options */}
      <div className="mb-6">
        <FilterComponent
          sortBy={sortBy}
          setSortBy={setSortBy}
          minRating={minRating}
          setMinRating={setMinRating}
        />
      </div>

      {/* Ratings Card Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Ratings
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading ratings...</p>
        ) : sortedRatings.length === 0 ? (
          <p className="text-gray-500">No ratings match your filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedRatings.map((r, index) => (
              <div
                key={`${r.id}-${index}`}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold text-gray-800">
                    {r.user_name || "Anonymous"}
                  </h3>
                  <span className="text-yellow-600 font-bold">
                    ⭐ {r.rating}
                  </span>
                </div>
                {/* <p className="text-gray-600 text-sm mb-2">
                  {r.comment || "No comment"}
                </p> */}
                <p className="text-xs text-gray-400">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OwnerDashboard;
