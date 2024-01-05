const postModel = require('../model/postsModel')
const userModel = require('../model/authModel')
exports.addPosts = async (req,res)=>{
  try {
    if(req.session.email){
      const logUserEmail = req.session.email
      const logUserId = req.session.b_id;
      const data = await userModel.find({email:logUserEmail})
      req.body.buyer_id = logUserId
      const addData = await postModel.create(req.body)
      res.status(200).json({
        status:"Success",
        data, 
        addData
      })
    }else{
      res.status(502).json({
        status:"LoginFirst",
      })
    }
  } catch(error){
    res.status(500).json({
      error : error.toString()
    })
  }
}

exports.viewPosts = async(req,res)=>{
  try{
    if(req.session.email){
      const logUserId = req.session.b_id
      const data = await postModel.find({buyer_id:logUserId})
      res.status(200).json({
        status:"Success",
        data
      })
    }else{
      res.status(502).json({
        status:"LoginFirst",
      })
    }
  } catch(error){
    res.status(500).json({
      error : error.toString()
    })
  }
}