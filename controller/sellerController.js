const sellerModel = require('../model/authModel')

exports.viewSeller = async (req, res) => {
  try {
    console.log(req.user.email);
    const data = await sellerModel.find({ role: 'seller' });
    res.status(200).json({
      status: "Fetching success!",
      data
    })
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}