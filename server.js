const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI from environment variable
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define the home route
app.get('/', (req, res) => {
    res.send(`Welcome to the home page. Database connection status: ${db.readyState === 1 ? 'Connected' : 'Not Connected'}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});