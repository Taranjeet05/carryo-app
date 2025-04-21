const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
} = require("../controllers/authControllers");

router.get("/", (req, res) => {
  res.send("Hey, This is working perfectly");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);

module.exports = router;
