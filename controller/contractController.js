const contractModel = require('../model/contract')
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
        $and: [
          {
            $or: [
              { buyer_id: req.body.buyer_id },
              { seller_id: req.body.seller_id }
            ]
          },
          { isDeleted: false }
        ]
      });
      if (data != '') {
        res.status(200).json({
          status: true,
          data
        })
      } else {
        res.status(200).json({
          status: false,
          message: "data is empty"
        })
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