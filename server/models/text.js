const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  pageID: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("text", TextSchema);
