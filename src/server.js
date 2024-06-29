const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = require("./app");

app.use(express.json());

mongoose
  .connect(config.db.uri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
