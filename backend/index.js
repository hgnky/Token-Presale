const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Use middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Presale website");
})

// Define router

// Start the server
const PORT = process.env.PORT || 5031;
app.listen(PORT, console.log(`App is running on port ${PORT}`));