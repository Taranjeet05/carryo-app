require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.send(
    "Hare Krishna Hare Krishna, Krishna Krishna Hare Hare, Hare Rama Hare Rama, Rama Rama Hare Hare"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
