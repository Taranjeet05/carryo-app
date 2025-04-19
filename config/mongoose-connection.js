const mongoose = require("mongoose");
const config = require("./development.json");
const debug = require("debug")("development:mongoose-connection");

const URI = config.mongodb.URI;

if (!URI) {
  debug("❌ MONGODB_URI is not defined in the config file.");
  process.exit(1);
}

mongoose
  .connect(URI)
  .then(() => debug("✅ MongoDB is connected"))
  .catch((error) => debug(`❌ Something went wrong: ${error.message}`));

module.exports = mongoose.connection;
