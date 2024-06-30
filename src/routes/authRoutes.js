const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/createUser", authController.createUser);
router.post("/login", authController.login);
router.post("/createMovie", authController.createMovie);
router.get("/getallmovies", authController.getAllMovies);

module.exports = router;
