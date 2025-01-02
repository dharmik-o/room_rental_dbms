const express = require("express");
const db = require("../db/connection");
const router = express.Router();
router.post("/search-rooms", (req, res) => {
    const { area, roomType, maxPrice } = req.body;
    const query = `
      SELECT Rooms.room_id, Rooms.area, Rooms.room_type, Rooms.price, Rooms.available, 
             Users.name AS owner_name, OwnerDetails.contact_number, OwnerDetails.email
      FROM Rooms
      LEFT JOIN Users ON Rooms.owner_id = Users.user_id
      LEFT JOIN OwnerDetails ON Users.user_id = OwnerDetails.owner_id
      WHERE Rooms.area LIKE ? 
        AND Rooms.room_type = ? 
        AND Rooms.price <= ? 
        AND Rooms.available = TRUE;
    `;

    db.query(query, [`%${area}%`, roomType, maxPrice], (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Failed to retrieve rooms." });
        return;
      }
  
      res.json(results);
    });
  });

module.exports = router;