//Import the necessary modules
const express = require('express');         // Initialize Express framework to build the web application
const connectDB = require('./config/db');   // Config for MongoDB database connection
const dotenv = require('dotenv');           // Module to load environment variables (for security to hide API key from repository)
const cors = require('cors');               // Module to enable Cross-Origin Resource Sharing
const auth = require("./routes/auth");

dotenv.config();    // Load environment variables from .env file
connectDB();        // Function from db.js to connect MongoDB database

const app = express(); //Initialize the express into app variable

// Middleware
app.use(express.json()); // to parse every incoming JSON requests
app.use(cors());         // to enable CORS (Cross-Origin Resource Sharing)

app.use('/api/tasks', require('./routes/task_route')); // Define routes for tasks CRUD operation
app.use("/api/auth", auth);           // Define routes for authentication
const PORT = 5000; // Set the port for the server to listen on, defaulting to 5000

const path = require("path");

//Initialize the frontend page
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start the server and listen on the specified port (will be on localhost:5000)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});