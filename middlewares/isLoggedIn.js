const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const debug = require("debug")("development: isLoggedIn");

module.exports = async (req, res, next) => {
  if (!req.cookie.token) {
    req.flash("erorr", "You need to login first");
    res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookie.token, process.env.SECRET);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    req.user = user;

    next();
  } catch (error) {
    debug(`Something went wrong ${error.message}`);
    redirect("/");
  }
};
