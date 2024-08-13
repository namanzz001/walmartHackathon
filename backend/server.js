// Existing imports and setup
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Ensure the path is correct

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/walmartHackathon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Businessman Dashboard Data
const salesData = {
  weekly: 1000,
  monthly: 4000,
  yearly: 50000,
  categories: {
    Electronics: 20000,
    Groceries: 15000,
    Clothing: 15000,
  }
};

const inventoryData = {
  Electronics: 50,
  Groceries: 200,
  Clothing: 120,
};

// Endpoint to get sales data
app.get('/api/sales', (req, res) => {
  res.json(salesData);
});

// Endpoint to get inventory data
app.get('/api/inventory', (req, res) => {
  res.json(inventoryData);
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ firstName, lastName, email, phoneNumber, password, role });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Ensure the role is correctly obtained from the user object
      const role = user.role;
      console.log('User role:', role); // Debug log
  
      // Generate the JWT token
      const token = jwt.sign({ userId: user._id, role: role }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.json({ token, role });  // Ensure role is sent in the response
    } catch (error) {
      console.error('Server error during login:', error); // Debug log
      res.status(500).json({ error: 'Server error during login' });
    }
  });
  
  

// Fetch user details
app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId).select('firstName lastName email role');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
