const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  genre: { type: String, required: true },
});


module.exports = mongoose.model("movies", movieSchema);
