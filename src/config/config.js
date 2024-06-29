module.exports = {
  db: {
    uri: "mongodb://127.0.0.1:27017/moviemaster",
  },
  jwtSecret: process.env.JWT_SECRET || "defaultsecret",
};
