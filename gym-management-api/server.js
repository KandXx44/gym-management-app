const express = require('express');
const cors = require('cors');
const app = express();

// Import your routes
const memberRoutes = require('./routes/memberRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const loginRoute = require('./routes/loginRoute');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true,  // Allow cookies to be sent with requests
}));

// Middleware for JSON parsing
app.use(express.json());

// Register routes (no session-related middleware)
app.use('/api/members', memberRoutes); 
app.use('/api/employees', employeeRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
