const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const debug = require("debug")("development: index.js");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false, showFooter: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    const success = req.flash("success");
    res.render("shop", { products, success });
  } catch (error) {
    debug("Error creating owner:", error.message);
    res.status(500).send("An internal server error occurred");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart.productId");
  res.render("cart", { user });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findOne({ email: req.user.email });

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
    req.flash("success", "Added to Cart");
    res.redirect("/shop");
  } catch (error) {
    debug("Error creating owner:", error.message);
    res.status(500).send("An internal server error occurred");
  }
});

module.exports = router;
