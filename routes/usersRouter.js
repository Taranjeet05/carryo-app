const express = require("express");
const router = express.Router();
const debug = require("debug")("development: usersRouter");
const { z } = require("zod");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

const userRegistrationSchema = z.object({
  userName: z.string().trim().min(3, "Username must be 3 characters long"),
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
      const errorMessage = {};
      parsed.error.errors.forEach((error) => {
        errorMessage[error.path[0]] = error.message;
      });

      return res.status(400).render("index", {
        error: errorMessage,
        success: "",
        FormData: req.body,
      });
    }

    const { userName, email, password } = parsed.data;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).render("index", {
        error: { email: "This email is already registered." },
        success: "",
        formData: req.body,
      });
    }
    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });

    res.status(201).render("index", {
      success: "Account created successfully 🎉",
      error: {},
      formData: {},
    });
  } catch (error) {
    debug(`Error creating User ${error.message}`);
    res.status(500).render("index", {
      error: { general: "Something went wrong. Try again later." },
      success: "",
      FormData: req.body,
    });
  }
});

module.exports = router;
