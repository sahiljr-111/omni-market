const authModel = require('../model/authModel');
const userModel = require('../model/authModel')
const postModel = require('../model/postsModel')

exports.viewUser = async (req, res) => {
  try {
    if (req.user.email) {
      const data = await userModel.find({ role: 'buyer', isDeleted: false });
      if (data != '') {
        res.status(200).json({
          status: "Fatching successfull",
          data
        })
      } else {
        res.status(400).json({
          message: "not found seller"
        })
      }
    } else {
      res.status(400).json({
        message: 'Unauthorised!'
      })
    }
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
      console.log("sess", req.session.b_id);
      // var logUserId = req.session.b_id;
      // req.body.buyer_id = logUserId
      var addData = await postModel.create(req.body)
      res.status(200).json({
        status: "Success",
        addData,
        data,
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

exports.viewPosts = async (req, res) => {
  try {
    if (req.user.email) {
      const sellerData = await authModel.find({ email: req.user.email })
      console.log(sellerData);
      if (sellerData[0].role == 'seller') {
        const data = await postModel.find().populate('buyer_id', '-password')
        console.log("-----------------", data);
        if (data != '') {
          res.status(200).json({
            status: "Success",
            data
          })
        } else {
          res.status(400).json({
            status: 'false',
            message: "Data not found"
          })
        }
      } else {
        console.log('->req.user.email --->', req.user.email)
        console.log('buyerSessid', req.session.b_id)
        // if (req.session.b_id) {
        //   const logUserId = req.session.b_id
        const data = await postModel.find({ buyer_id: req.body.buyer_id }).populate('buyer_id', '-password')
        if (data != '') {
          res.status(200).json({
            status: "Success",
            data
          })
        } else {
          res.status(400).json({
            status: 'false',
            message: "Data not found"
          })
        }
        // } else {
        //   res.status(400).json({
        //     status: "false",
        //     message: "session is empty"
        //   })
        // }
      }
      // console.log('->req.user.email --->', req.user.email)
      // // if (req.session.b_id) {
      // const logUserId = req.session.b_id
      // const data = await postModel.find({ isDeleted: false }).populate('buyer_id', '-password')
      // if (data != '') {
      //   res.status(200).json({
      //     status: "Success",
      //     data
      //   })
      // } else {
      //   res.status(400).json({
      //     status: 'false',
      //     message: "Data not found"
      //   })
      // }
      // } else {
      //   res.status(400).json({
      //     status: "false",
      //     message: "session is empty"
      //   })
      // }

    } else {
      res.status(502).json({
        status: "LoginFirst",
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}
