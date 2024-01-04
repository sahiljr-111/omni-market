const mongoose = require('mongoose')
const diamondSchema = new mongoose.Schema({
  diamond_name: {
    type: String,
    require: true
  },
  quality_of_rough: {
    type: String
  },
  cut_of_diamond: {
    type: String
  },
  polish_color: {
    type: String,
  },
  polish_type: {
    type: String
  }
})
module.exports = mongoose.model('diamond',diamondSchema)