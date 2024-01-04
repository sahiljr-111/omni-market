const userModel = require('../model/authModel')

exports.viewUser = async (req, res) => {
  try {
    const data = await userModel.find({ role: 'buyer' , isDeleted:false});
    res.status(200).json({
      status: "Fatching successfull",
      data
    })
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}

