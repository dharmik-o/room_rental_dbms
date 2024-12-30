const mysql = require('mysql2'); // Use the promise-based MySQL2 module
const dotenv = require('dotenv');

dotenv.config();

// Create the connection using async/await and promise-based interface
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});
module.exports = db;
