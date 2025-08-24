import React, { useState } from "react";
import StoreCard from "../components/StoreCard";
import UserProfile from "../pages/UserProfile";

const mockStores = [
  { id: 1, name: "Coffee Paradise", address: "123 Brew Street", averageRating: 4.2 },
  { id: 2, name: "Gadget World", address: "456 Tech Ave", averageRating: 3.9 },
  { id: 3, name: "Book Haven", address: "789 Read Blvd", averageRating: 4.7 },
  { id: 4, name: "Fashion Fiesta", address: "101 Trendy Lane", averageRating: 4.0 },
  { id: 5, name: "Healthy Bites", address: "202 Organic Way", averageRating: 4.5 },
  { id: 6, name: "Techie Toys", address: "303 Gadget Grove", averageRating: 3.8 },
  { id: 7, name: "Shoe Stop", address: "404 Style Avenue", averageRating: 4.1 },
  { id: 8, name: "Grocery Galaxy", address: "505 Daily Street", averageRating: 4.3 },
  { id: 9, name: "Pet Planet", address: "606 Paw Boulevard", averageRating: 4.6 },
  { id: 10, name: "Fitness Fuel", address: "707 Gym Court", averageRating: 3.7 },
];

const UserDashboard = () => {
  const [search, setSearch] = useState("");
  const [userRatings, setUserRatings] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const filteredStores = mockStores.filter((store) =>
    `${store.name} ${store.address}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleRating = (storeId, rating) => {
    setUserRatings((prev) => ({ ...prev, [storeId]: rating }));
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear any stored session/token data
    alert("Logged out");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F8FAFC] via-[#E0E7FF] to-[#FDF2F8] py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-3xl p-10 border border-indigo-100">
        <div className="mb-6 text-center">
          <p className="uppercase tracking-widest text-sm text-indigo-500 font-bold mb-2 animate-pulse">
            👤 User Page
          </p>
          <h1 className="text-4xl font-black text-indigo-800 tracking-wide">
            🎉 Welcome to <span className="text-pink-600">Store Rating App!</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-8 gap-4">
          <button
            onClick={() => setShowProfile(true)}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            View Profile
          </button>
          <button
            onClick={() => setShowChangePassword(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Change Password Section */}
        {showChangePassword && (
          <div className="mt-6 p-6 bg-indigo-50 rounded-xl shadow-inner">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (newPassword !== confirmPassword) {
                      alert("Passwords do not match!");
                      return;
                    }
                    alert("Password changed successfully (mocked)");
                    setShowChangePassword(false);
                  }}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search by store name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition"
        />

        {/* Store List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              userRating={userRatings[store.id]}
              onRate={handleRating}
              showRateButton={true}
            />
          ))}
        </div>

        {filteredStores.length === 0 && (
          <p className="text-center text-gray-600 mt-10 text-lg">
            No stores match your search.
          </p>
        )}
      </div>

      {/* Profile Modal */}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default UserDashboard;
