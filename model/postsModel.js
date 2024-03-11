const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  diamond_image: {
    type: String,
    default: null
  },
  diamond_name: { type: String },
  quality_of_rough: { type: String },
  cut_of_diamond: { type: String },
  polish_color: { type: String },
  diamond_karate: { type: String },
  diamond_qty: { type: String },
  rating: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })
module.exports = mongoose.model('post', postSchema)