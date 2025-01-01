const express = require("express");
const db = require("../db/connection");
const router = express.Router();
router.delete('/rooms/:room_id', (req, res) => {
    console.log('hello');
    const roomId = req.params.room_id;
    const query = 'DELETE FROM Rooms WHERE room_id = ?';

    db.query(query, [roomId], (err, results) => {
        if (err) {
            console.error('Error deleting room:', err);
            return res.status(500).json({ error: 'Failed to delete room' });
        }
        res.json({ message: 'Room deleted successfully' });
    });
});

router.put('/rooms/:room_id', (req, res) => {
    const roomId = req.params.room_id;
    const { area, room_type, price } = req.body;
  
    const query = `
      UPDATE Rooms 
      SET area = ?, room_type = ?, price = ?
      WHERE room_id = ?
    `;
  
    db.query(query, [area, room_type, price, roomId], (err, results) => {
      if (err) {
        console.error('Error updating room:', err);
        return res.status(500).json({ error: 'Failed to update room' });
      }
      res.json({ message: 'Room updated successfully' });
    });
  });

module.exports = router;