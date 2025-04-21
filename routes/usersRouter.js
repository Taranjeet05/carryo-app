const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authControllers");

router.get("/", (req, res) => {
  res.send("Hey, This is working perfectly");
});

router.post("/register", registerUser);

module.exports = router;
