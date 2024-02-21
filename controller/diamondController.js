const diamondModel = require('../model/diamondModel')
exports.addDiamond = async (req, res) => {
  try{ 
    const data = await diamondModel.create(req.body)
    res.status(200).json({
      status: "Diamond Added",
      data
    })
  }catch(error){
    res.status(500).json({
      error : error.toString()
    })
  }
}
exports.viewDiamond = async (req, res)=>{
  try{
    const data = await diamondModel.find()
    res.status(200).json({
      status:"Diamond fetched successfully ",
      data
    })
  }catch(error){
    res.status(500).json({
      error : error.toString()
    })
  }
}