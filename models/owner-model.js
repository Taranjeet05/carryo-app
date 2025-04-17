const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    taxId: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Owner", ownerSchema);
