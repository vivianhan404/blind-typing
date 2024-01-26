const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  creator_id: String,
  prompt: String,
});

// compile model from schema
module.exports = mongoose.model("page", PageSchema);
