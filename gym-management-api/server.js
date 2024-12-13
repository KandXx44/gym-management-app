const express = require('express');
const cors = require('cors');
const session = require('express-session');
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

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,          // Restricts access to cookie from client-side JS
    secure: false,           // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60   // Session timeout (1 hour)
  }
}));

// Register routes
app.use('/api/members', memberRoutes); 
app.use('/api/employees', employeeRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
