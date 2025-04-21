const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const debug = require("debug")("development:ownersRoute");
const { z } = require("zod");

const ownersRegistrationSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

debug("NODE_ENV is", process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      const ownerCount = await ownerModel.countDocuments();
      if (ownerCount > 0)
        return res
          .status(403)
          .send("You are not allowed to create a new OWNER");

      const parsed = ownersRegistrationSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.errors.map((error) => error.message),
        });
      }

      const { userName, email, password } = parsed.data;

      const hashPassword = await bcrypt.hash(password, 10);
      const createdOwner = await ownerModel.create({
        userName,
        email,
        password: hashPassword,
      });

      res
        .status(201)
        .send(
          `🎉 Hello Boss, ${userName}! Your account has been created. >> ${createdOwner}`
        );
    } catch (error) {
      debug("Error creating owner:", error.message);
      res.status(500).send("An internal server error occurred");
    }
  });
}

router.get("/admin", (req, res) => {
  res.render("createProducts", {success : ''});
});

module.exports = router;
