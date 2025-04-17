require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send(
    "Hare Krishna Hare Krishna, Krishna Krishna Hare Hare, Hare Rama Hare Rama, Rama Rama Hare Hare"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
