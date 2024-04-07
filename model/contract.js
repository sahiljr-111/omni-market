const mongoose = require("mongoose");
const contractModel = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    post_id: {
      type:String,
    },
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    diamond_image: { type: String, default: null },
    seller_name: { type: String },
    seller_contact: { type: String },
    diamond_name: { type: Array },
    quality_of_rough: { type: Array },
    cut_of_diamond: { type: Array },
    diamond_karate: { type: String },
    rating: { type: String },
    bid_amount: { type: String },
    total_amount: { type: String },
    diamond_category: { type: Array },
    rough_quality: { type: Array },
    polish_type: { type: Array },
    polish_color: { type: Array },
    start_date: { type: String },
    end_date: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("contract", contractModel);
