const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
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
  /*
  const dummyProducts = [
    {
      name: "Product 1",
      price: 75,
      bgcolor: "#f5f5f5",
      panelcolor: "#e0e0e0",
      textcolor: "#333",
      image: Buffer.from(""),
    },
    {
      name: "Product 2",
      price: 120,
      bgcolor: "#ffe4e1",
      panelcolor: "#ffccd5",
      textcolor: "#222",
      image: Buffer.from(""),
    },
    {
      name: "Product 3",
      price: 95,
      bgcolor: "#e6f7ff",
      panelcolor: "#cceeff",
      textcolor: "#111",
      image: Buffer.from(""),
    },
    {
      name: "Product 4",
      price: 150,
      bgcolor: "#f0fff0",
      panelcolor: "#ccffcc",
      textcolor: "#000",
      image: Buffer.from(""),
    },
    {
      name: "Product 5",
      price: 60,
      bgcolor: "#fffaf0",
      panelcolor: "#ffebcd",
      textcolor: "#444",
      image: Buffer.from(""),
    },
    {
      name: "Product 6",
      price: 180,
      bgcolor: "#fdf5e6",
      panelcolor: "#faebd7",
      textcolor: "#666",
      image: Buffer.from(""),
    },
    {
      name: "Product 7",
      price: 130,
      bgcolor: "#e8f4f8",
      panelcolor: "#d1ecf1",
      textcolor: "#005f73",
      image: Buffer.from(""),
    },
    {
      name: "Product 8",
      price: 85,
      bgcolor: "#fbeec1",
      panelcolor: "#f6e27f",
      textcolor: "#6b4226",
      image: Buffer.from(""),
    },
    {
      name: "Product 9",
      price: 55,
      bgcolor: "#e2f0cb",
      panelcolor: "#c8e6c9",
      textcolor: "#2e7d32",
      image: Buffer.from(""),
    },
    {
      name: "Product 10",
      price: 200,
      bgcolor: "#ffecd2",
      panelcolor: "#ffd3b6",
      textcolor: "#ff6f61",
      image: Buffer.from(""),
    },
  ];*/
});

module.exports = router;
