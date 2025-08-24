// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import DashboardStats from "../components/DashboardStats";
import AddUserForm from "../components/AddUserForm";
import AddStoreForm from "../components/AddStoreForm";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Fetch users, stores, and ratings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, storesRes, ratingsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/user/all"),      // users endpoint
          axios.get("http://localhost:5000/api/owner/all"),     // stores endpoint
          axios.get("http://localhost:5000/api/ratings"),       // ratings endpoint
        ]);

        console.log("Users:", usersRes.data);
        console.log("Stores:", storesRes.data);
        console.log("Ratings:", ratingsRes.data);

        setUsers(usersRes.data);
        setStores(storesRes.data);
        setRatings(ratingsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.response || err);
      }
    };

    fetchData();
  }, []);

  // Add new user
  const addUser = async (user) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/create", user);
      setUsers([...users, res.data]);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Add new store
  const addStore = async (store) => {
    try {
      const res = await axios.post("http://localhost:5000/api/owner/create", store);
      setStores([...stores, res.data.store]); // ⚡ important: access `store` field
    } catch (err) {
      console.error("Error adding store:", err);
    }
  };

  // Update store rating
  const setRating = async (storeId, newRating) => {
    try {
      await axios.post("http://localhost:5000/api/ratings", {
        userId: 1, // replace with logged-in userId
        storeId,
        rating: newRating,
      });

      // Update local stores and ratings state
      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId ? { ...store, rating: newRating } : store
        )
      );

      const existingIndex = ratings.findIndex(r => r.store_id === storeId);
      if (existingIndex >= 0) {
        const updatedRatings = [...ratings];
        updatedRatings[existingIndex].rating = newRating;
        setRatings(updatedRatings);
      } else {
        setRatings([...ratings, { store_id: storeId, rating: newRating }]);
      }
    } catch (err) {
      console.error("Error updating rating:", err.response || err);
    }
  };

  const handleToggleProfile = () => setShowProfile(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800">
      <div className="p-4 md:p-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800 mb-1">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm font-medium italic">Welcome to the System Administrator Panel</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleToggleProfile}
              className="bg-white border border-blue-500 text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mt-4 text-sm font-semibold">
          {["dashboard", "add", "tables"].map(tab => (
            <button
              key={tab}
              className={`py-2 px-4 rounded-full ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-white border border-blue-300 text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "dashboard" ? "Dashboard Stats" : tab === "add" ? "Add User/Store" : "User & Store List"}
            </button>
          ))}
        </div>

        {/* Profile */}
        {showProfile && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ProfileCard
              userId={1}
              name="Admin"
              email="admin@example.com"
              role="Admin"
              onSuccess={() => alert("Password updated successfully.")}
              onError={(msg) => alert(msg)}
            />
          </div>
        )}

        {/* Dashboard Stats */}
        {activeTab === "dashboard" && (
          <DashboardStats users={users} stores={stores} ratings={ratings} />
        )}

        {/* Add User / Store */}
        {activeTab === "add" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AddUserForm addUser={addUser} />
            <AddStoreForm addStore={addStore} />
          </section>
        )}

        {/* User & Store Tables */}
        {activeTab === "tables" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UserTable users={users} />
            <StoreTable stores={stores} ratings={ratings} setRating={setRating} />
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Admin System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
