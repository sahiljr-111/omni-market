const diamondModel = require('../model/diamondModel')
exports.addDiamond = async (req, res) => {
  try {
    if (req.user.email === 'sahil' || req.user.email === 'utsav') {
      const data = await diamondModel.create(req.body)
      res.status(200).json({
        status: "Diamond Added",
        data
      })
    } else {
      res.status(400).json({
        status: "false",
        message: "you are not admin"
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}
exports.viewDiamond = async (req, res) => {
  try {
    const data = await diamondModel.find({ isDeleted: false })
    if (data != '') {
      res.status(200).json({
        status: "Diamond fetched successfully ",
        data
      })
    } else {
      res.status(400).json({
        status: "false",
        message: "diamond not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}