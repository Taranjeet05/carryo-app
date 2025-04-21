const debug = require("debug")("development: authControllers");
const { z } = require("zod");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { genrateToken } = require("../utils/genrateToken");

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

module.exports.registerUser = async (req, res) => {
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
        .send("You already have an account with this Email.");

    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });

    const token = genrateToken(createUser);
    res.cookie("token", token);

    res.redirect("/");
  } catch (error) {
    debug(`Error creating user ${error.message}`);
    res.status(500).send("An internal server error occured");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser)
      return res.status(401).send("Email or Password is Incorrect");
    const verifyPassword = await bcrypt.compare(password, findUser.password);
    if (!verifyPassword)
      return res.status(401).send("Email or Password is Incorrect");

    const token = genrateToken(findUser);
    res.cookie("token", token);

    res.redirect("/shop");
  } catch (error) {
    debug(`Error while login ${error.message}`);
    res.status(500).send("An internal server error occured");
  }
};
