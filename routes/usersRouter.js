const express = require("express");
const router = express.Router();
const debug = require("debug")("development: usersRouter");
const { z } = require("zod");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

const userRegistrationSchema = z.object({
  userName: z.string().trim().min(3, "Username is Required"),
  email: z
    .string()
    .trim()
    .email("Invalid Email Format")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

router.get("/", (req, res) => {
  res.send("Hey, This is working perfectly");
});

router.post("/register", async (req, res) => {
  try {
    const parsed = userRegistrationSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.errors.map((error) => error.message),
      });
    }

    const { userName, email, password } = parsed.data;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(401)
        .send("You cannot have new account with same Email.");

    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });

    res.redirect("/");
  } catch (error) {
    debug(`Error creating user ${error.message}`);
    res.status(500).send("An internal server error occured");
  }
});

module.exports = router;
