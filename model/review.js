const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth' },
  rating: { type: Number, default: 0 },
  message: { type: String },
});

module.exports = new mongoose.model("review", reviewSchema);
