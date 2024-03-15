const mongoose = require('mongoose')
const bidSchema = new mongoose.Schema({

  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post', require: true },
  bid_amount: { type: String },
  diamond_category: { type: Array },
  rough_quality: { type: Array },
  polish_type: { type: Array },
  polish_color: { type: Array },
  start_date: { type: String },
  end_date: { type: String },
  description: { type: String },
  is_deleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('bid', bidSchema)