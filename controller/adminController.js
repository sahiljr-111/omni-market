const adminModel = require('../model/adminModel')
const authModel = require('../model/authModel')
const jwt = require('jsonwebtoken')
exports.loginAdmin = async (req, res) => {
  try {
    const data = await adminModel.find({ email: req.body.email })
    if (data != '') {
      if (data[0].password == req.body.password) {
        console.log(data);
        const token = jwt.sign({ email: data[0].email }, process.env.SECRET_KEY)
        res.status(200).json({
          status: "success",
          data,
          token
        })
      } else {
        res.status(400).json({
          status: "false",
          message: "Password incorrect"
        })
      }
    } else {
      res.status(400).json({
        status: "false",
        message: "Admin Not Found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString()
    })
  }
}

exports.allSeller = async (req, res) => {
  try {
    if (req.user.email === 'sahil' || req.user.email == 'utsav') {
      const data = await authModel.find({ role: 'seller' })
      res.status(200).json({
        status: "success",
        data
      })
    } else {
      res.status(400).json({
        status: "false",
        message: "You are Admin but not allow to Access"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString()
    })
  }
}

exports.allBuyer = async (req, res) => {
  try {
    if (req.user.email === 'sahil' || req.user.email == 'utsav') {
      const data = await authModel.find({ role: 'buyer' })
      res.status(200).json({
        status: "success",
        data
      })
    } else {
      res.status(400).json({
        status: "false",
        message: "You are Admin but not allow to Access"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString()
    })
  }
}
exports.allClient = async (req, res) => {
  try {
    if (req.user.email === 'sahil' || req.user.email == 'utsav') {
      const data = await authModel.find()
      res.status(200).json({
        status: "success",
        data
      })
    } else {
      res.status(400).json({
        status: "false",
        message: "You are Admin but not allow to Access"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString()
    })
  }
}