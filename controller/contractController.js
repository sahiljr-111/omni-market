const contractModel = require('../model/contract');
const postsModel = require('../model/postsModel');
exports.addContract = async (req, res) => {
  try {
    if (req.user.email) {
      const data = await contractModel.create(req.body);
      res.status(200).json({
        status: true,
        data
      })
    } else {
      res.status(200).json({
        status: false,
        message: 'login first'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

exports.viewContract = async (req, res) => {
  try {
    if (req.user.email) {
      const data = await contractModel.find({
        $or: [
          { buyer_id: req.body.buyer_id },
          { seller_id: req.body.seller_id }
        ]
      });
      const postdata = await postsModel.findById({ _id: data[0].post_id })
      if (postdata.isDeleted == true) {
        res.status(200).json({
          status: false,
          msg: "post is deleted"
        })
      } else {
        if (data != '') {
          res.status(200).json({
            status: true,
            data
          })
        } else {
          res.status(200).json({
            status: false,
            message: "Data not found"
          })
        }
      }
    } else {
      res.status(200).json({
        status: false,
        message: 'login first'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
