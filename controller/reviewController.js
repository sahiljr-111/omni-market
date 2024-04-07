const reviewModel = require('../model/review')
exports.addReview = async (req, res) => {
  try {
    const data = await reviewModel.create(req.body)
    res.status(200).json({
      status: true,
      data: data
    })
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}

exports.viewReview = async (req, res) => {
  try {
    const data = await reviewModel.find().populate('client_id')
    res.status(200).json({
      status: true,
      data: data
    })
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
}