const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const { z } = require("zod");
const debug = require("debug")("development: productRouter");

const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product Name should be at least 3 character long ")
    .max(50, "Product Name is too long"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Product Price should not less then 0")
  ),
  discount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Product Discount should not be less then 0")
  ),
  bgColor: z.string().trim().max(20),
  panelColor: z.string().trim().max(20),
  textColor: z.string().trim().max(20),
});

router.get("/", (req, res) => {
  res.send("Hey, This is working perfectly");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgColor, panelColor, textColor } = req.body;

    const productData = {
      name,
      price: Number(price),
      discount: Number(discount),
      bgColor,
      panelColor,
      textColor,
    };

    const validation = createProductSchema.safeParse(productData);
    if (!validation.success) {
      return res.status(400).send(validation.error.errors);
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Image is required. Please upload a product image 📸",
      });
    }

    const newProduct = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    req.flash("success", "✅ Product created Successfully.");
    res.redirect("/owners/admin");
  } catch (error) {
    debug("something went wrong", error.message);
    res.status(500).send("some internal issues");
  }
});

module.exports = router;
