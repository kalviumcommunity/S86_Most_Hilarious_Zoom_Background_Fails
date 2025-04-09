const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/asap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const commentRoutes = require('./routes/comments');
app.use('/comments', commentRoutes); // ✅ Mount the /comments route

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
