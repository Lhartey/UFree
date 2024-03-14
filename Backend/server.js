const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT ; // Use environment variable for port

// Connect to MongoDB database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error(err));

// CORS middleware (adjust allowed origins based on your setup)
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend (replace with your frontend URL)

// Parse incoming JSON data
app.use(express.json());

// API routes (import and use route handlers here)
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));