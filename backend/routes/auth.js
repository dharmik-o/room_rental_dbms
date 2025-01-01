const express = require("express");

const db = require("../db/connection");

const router = express.Router();

router.post('/register', (req, res) => {
    const { name, age, gender, dob, password, role, contact_number, email } = req.body;
  
    // Insert into Users table
    db.query(
      `INSERT INTO Users (name, age, gender, dob, password, role) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, age, gender, dob, password, role],
      (err, results) => {
        if (err) {
          console.error('Error inserting into Users table:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        const userId = results.insertId; // Get the inserted user's ID
  
        // If the role is owner, insert into OwnerDetails table
        if (role === 'owner') {
          db.query(
            `INSERT INTO OwnerDetails (owner_id, contact_number, email) VALUES (?, ?, ?)`,
            [userId, contact_number, email],
            (err) => {
              if (err) {
                console.error('Error inserting into OwnerDetails table:', err);
                return res.status(500).json({ error: 'Database error' });
              }
  
              res.status(201).json({ message: 'Owner registered successfully', user_id: userId });
            }
          );
        } else {
          res.status(201).json({ message: 'User registered successfully', user_id: userId });
        }
      }
    );
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT user_id, name, role FROM Users WHERE name = ? AND password = ?`;
  
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const user = results[0];
      // Send user details including role
      res.json({
        user_id: user.user_id,
        name: user.name,
        role: user.role,
      });
    });
  });
  

router.post('/owner', (req, res) => {
  const { ownerarea, ownerRoomType, ownerPrice, owner_id } = req.body;
  console.log(req.body);
  if (!owner_id || !ownerarea || !ownerRoomType || !ownerPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO Rooms (owner_id, area, room_type, price) VALUES (?, ?, ?, ?)`;
  db.query(query, [owner_id, ownerarea, ownerRoomType, ownerPrice], (err) => {
    if (err) {
      console.error('Error inserting into Rooms table:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Room added successfully' });
  });
});

router.get('/rooms/:owner_id', (req, res) => {
  const ownerId = req.params.owner_id;
  console.log(ownerId);
  console.log("hello how are you ");
  const query = 'SELECT room_id, area, room_type, price FROM Rooms WHERE owner_id = ?';

  db.query(query, [ownerId], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
  });
});
module.exports = router;