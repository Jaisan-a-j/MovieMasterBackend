const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const movieModel = require("../models/movies");
const config = require("../config/config");

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, config.jwtSecret);
};

const createUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createMovie = async (req, res) => {
  try {
    const newMovie = await movieModel.create(req.body);
    res.json(newMovie);
  } catch (err) {
    console.error("Error creating movie:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.json(movies);
  } catch (err) {
    console.error("Error collecting All movies:", err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not registered." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password." });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, login, createMovie, getAllMovies };
