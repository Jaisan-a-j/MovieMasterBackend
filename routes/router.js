const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  const userData = [
    {
      id: "101",
      name: "jaisan",
    },
    {
      id: "102",
      name: "justin",
    },
  ];

  res.send(userData);
});

module.exports = router;
