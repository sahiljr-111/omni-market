const userModel = require('../model/authModel')
const postModel = require('../model/postsModel')

exports.viewUser = async (req, res) => {
  try {
    const data = await userModel.find({ role: 'buyer', isDeleted: false });
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

exports.addPosts = async (req, res) => {
  try {
    const data = await userModel.find({ email: req.user.email, role: 'buyer', isDeleted: false })
    if (data != '') {
      const logUserId = req.session.b_id;
      req.body.buyer_id = logUserId
      const addData = await postModel.create(req.body)
      res.status(200).json({
        status: "Success",
        data,
        addData
      })
    } else {
      res.status(502).json({
        status: "You are seller",
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}

// exports.viewPosts = async (req, res) => {
//   try {
//     if (req.user.email) {
//       const logUserId = req.session.b_id
//       const data = await postModel.find({ buyer_id: logUserId })
//       res.status(200).json({
//         status: "Success",
//         data
//       })
//     } else {
//       res.status(502).json({
//         status: "LoginFirst",
//       })
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: error.toString()
//     })
//   }
// }
