const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const debug = require("debug")("development: index.js");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    res.render("shop", { products });
  } catch (error) {
    debug("Error creating owner:", error.message);
    res.status(500).send("An internal server error occurred");
  }
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params;
    const user = await userModel.findOne({ user: req.user.email });

    if (!user) return res.redirect("/");

    const existingProductIndex = user.cart.findIndex((item) =>
      item.productId.equals(id)
    );

    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity += 1;
    } else {
      user.cart.push({ productId: id, quantity: 1 });
    }

    await user.save();
    res.redirect("/shop");
  } catch (error) {
    debug("Error creating owner:", error.message);
    res.status(500).send("An internal server error occurred");
  }
});

module.exports = router;
