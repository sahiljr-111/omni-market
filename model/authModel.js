const mongoose = require("mongoose");
const userModel = new mongoose.Schema(
  {
    profile: {
      type: String,
      default: null,
    },
    name: { type: String },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    contact: { type: String },
    password: { type: String },
    seller_category: { type: [] },
    role: { type: String },
    subscription_type: { type: String, default:null },
    start_date: { type: Date, default : null },
    end_time: { type: Date, default:null},
    isVerified: { type: Boolean, default: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("auth", userModel);
