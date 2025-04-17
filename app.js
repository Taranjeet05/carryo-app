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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
