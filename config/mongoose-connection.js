const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => console.log("✅ MongoDb is Connected"))
  .catch((error) => console.log(`❌ Something Went Wrong ${error}`));

module.exports = mongoose.connection;
