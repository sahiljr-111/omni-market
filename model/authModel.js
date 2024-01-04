const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    require: true
  },
  contact: { type: String },
  password: { type: String },
  role: { type: String },
  isDeleted: {
    type: Boolean,
    default:false
  }
}, { timestamps: true })
module.exports = mongoose.model('auth', userModel)