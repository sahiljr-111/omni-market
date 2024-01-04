const mongoose = require('mongoose')
const diamondSchema = new mongoose.Schema({
  diamond_name: {
    type: String,
    require: true
  },
  quality_of_rough: {
    type: Array
  },
  cut_of_diamond: {
    type: Array
  },
  polish_color: {
    type: Array,
  },
  polish_type: {
    type: Array
  }
})
module.exports = mongoose.model('diamond',diamondSchema)