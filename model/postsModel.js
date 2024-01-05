const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  buyer_id: { type: String },
  diamond_name : {type:String},
  quality_of_rough : {type:String},
  cut_of_diamond : {type:String},
  polish_color : {type:String},
  diamond_karate : {type:String},
  diamond_qty : {type:String}, 
  isDeleted : {
    type:Boolean ,
    default : false
  }
}, { timestamps: true })
module.exports = mongoose.model('post', postSchema)