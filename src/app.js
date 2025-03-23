const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection function

const app = express();

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

