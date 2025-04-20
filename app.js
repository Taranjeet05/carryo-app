require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

/* I am creating some routes for testing out ejs*/

app.get("/", (req, res) => {
  res.render("index", { error: "" }); // Render the index.ejs file
});

app.get("/header", (req, res) => {
  res.render("header"); // Render the header.ejs file
});

app.get("/admin", (req, res) => {
  res.render("admin"); // Render the admin.ejs file
});

app.get("/cart", (req, res) => {
  res.render("cart"); // Render the cart.ejs file
});

app.get("/create-products", (req, res) => {
  res.render("createProducts", { success: "" }); // Render the createProducts.ejs file
});

app.get("/owner-login", (req, res) => {
  res.render("owner-login"); // Render the owner-login.ejs file
});

app.get("/shop", (req, res) => {
  res.render("shop", { products: [] }); // Render the shop.ejs file
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
