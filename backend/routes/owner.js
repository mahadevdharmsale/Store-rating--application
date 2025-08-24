const express = require("express");
const router = express.Router();

// ✅ Base test route
router.get("/", (req, res) => {
  res.send("Store route working!");
});

// ✅ All stores route (dummy data for now)
router.get("/all", (req, res) => {
  // Example data (normally this comes from your DB)
  const stores = [
    {
      id: 1,
      name: "Fresh Mart",
      address: "123 Main Street, Solapur",
      owner_id: 101,      // ID of the store owner (user)
      rating: 4.5,       // Average rating
      submitRating: 120  // Total number of ratings submitted
    },
    {
      id: 2,
      name: "Tech Hub",
      address: "456 Market Road, Pune",
      owner_id: 102,
      rating: 4.2,
      submitRating: 85
    }
  ];

  res.json(stores);
});

module.exports = router;
