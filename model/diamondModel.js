const mongoose = require("mongoose");
const diamondSchema = new mongoose.Schema(
  {
    diamond_name: {
      type: Array,
      require: true,
    },
    quality_of_rough: {
      type: Array,
    },
    cut_of_diamond: {
      type: Array,
    },
    polish_color: {
      type: Array,
    },
    polish_type: {
      type: Array,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("diamond", diamondSchema);
