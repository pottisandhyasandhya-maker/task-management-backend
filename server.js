const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables FIRST (important)
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB safely
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});