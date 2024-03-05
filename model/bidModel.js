const mongoose = require('mongoose')
const bidSchema = new mongoose.Schema({

  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  bid_amount: { type: String },
  diamond_category: { type: String },
  rough_quality: { type: String },
  polish_type: { type: String },
  polish_color: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  description: { type: String },
  is_deleted: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model('bid', bidSchema)