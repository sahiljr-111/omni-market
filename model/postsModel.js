const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  diamond_image: {
    type: String,
    default: null
  },
  diamond_name: { type: Array },
  quality_of_rough: { type: Array },
  cut_of_diamond: { type: Array },
  polish_color: { type: Array },
  polish_type: { type: Array },
  diamond_karate: { type: String },
  diamond_qty: { type: String },
  rating: {
    type: String,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })
module.exports = mongoose.model('post', postSchema)