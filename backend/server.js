const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const OwnerRoutes = require('./routes/owner')
const UserRoutes = require('./routes/user');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/owner",OwnerRoutes);
app.use('/api/user',UserRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
