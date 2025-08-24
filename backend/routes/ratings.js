const router = require("express").Router();
const db = require("../config/db");

// ✅ Submit/update rating
router.post("/", async (req, res) => {
  const { userId, storeId, rating, comment } = req.body;
  try {
    const [userCheck] = await db.query("SELECT id FROM users WHERE id = ?", [userId]);
    if (userCheck.length === 0) return res.status(400).json({ message: "User does not exist" });

    const [storeCheck] = await db.query("SELECT id FROM stores WHERE id = ?", [storeId]);
    if (storeCheck.length === 0) return res.status(400).json({ message: "Store does not exist" });

    const [existing] = await db.query(
      "SELECT id FROM ratings WHERE user_id = ? AND store_id = ?",
      [userId, storeId]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE ratings SET rating = ?, comment = ?, created_at = NOW() WHERE user_id = ? AND store_id = ?",
        [rating, comment, userId, storeId]
      );
    } else {
      await db.query(
        "INSERT INTO ratings (user_id, store_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())",
        [userId, storeId, rating, comment || null]
      );
    }

    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all ratings
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         r.id, 
         r.rating,
         r.created_at,
         u.name AS user_name, 
         s.name AS store_name,
         r.store_id,
         r.user_id
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       JOIN stores s ON r.store_id = s.id
       ORDER BY r.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Get all ratings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get ratings of a single user
router.get("/user/:userId", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         r.id, 
         r.rating, 
         r.comment, 
         r.created_at,
         u.name AS user_name, 
         s.name AS store_name,
         r.store_id,
         r.user_id
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       JOIN stores s ON r.store_id = s.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get ratings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get ratings for a store (important for OwnerDashboard)
router.get("/store/:storeId", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         r.id, 
         r.rating, 
         r.comment, 
         r.created_at,
         u.name AS user_name, 
         s.name AS store_name,
         r.store_id,
         r.user_id
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       JOIN stores s ON r.store_id = s.id
       WHERE r.store_id = ?
       ORDER BY r.created_at DESC`,
      [req.params.storeId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get store ratings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
