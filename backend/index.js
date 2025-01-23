const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./Models/db");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./Routes/AuthRouter");
const productRoutes = require("./Routes/ProductRouter");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from backend");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Database connection
db();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
