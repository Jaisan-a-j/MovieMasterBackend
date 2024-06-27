const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("./models/users");

// Define JWT secret directly (or provide a default)
const jwtSecret = process.env.JWT_SECRET || "defaultsecret";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/moviemaster");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "Access denied. Token is required." });

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, jwtSecret);
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not registered." });

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password." });

    // Generate and return token
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/adminpage", verifyToken, (req, res) => {
  res.json({ message: "Welcome to admin page!" });
});

app.post("/createUser", async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
