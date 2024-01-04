const userModel = require('../model/authModel')
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


exports.addClient = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const data = await userModel.create(req.body);
    res.status(200).json({
      status: "User added successfully!",
      data
    })
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}


var userData = [];
var OTP = ""
exports.loginClient = async (req, res) => {
  try {
    if (!req.session.email) {
      const data = await userModel.find({ email: req.body.email });
      console.log(data)
      console.log(req.session.email)
      var solved = await bcrypt.compare(req.body.password, data[0].password);
      if (solved) {
        req.session.email = data[0].email;
        req.session.save();
        res.status(200).json({
          data
        })
        //   // OTP verification
        //   userData[0] = data;
        //   req.session.email = data[0].username;
        //   req.session.save();
        //   console.log(req.session.email)

        //   var digits = '0123456789';
        //   for (let i = 0; i < 4; i++) {
        //     OTP += digits[Math.floor(Math.random() * 10)];
        //   }
        //   console.log(OTP)
        //   var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'sahiljr1093@gmail.com',
        //       pass: 'jbmoezfmthcilimv'
        //     }
        //   });

        //   var mailOptions = {
        //     from: 'sahiljr1093@gmail.com',
        //     to: req.body.email,
        //     subject: 'Omni-Market verification code *keepitsecret*',
        //     text: OTP
        //   };

        //   transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });
        //   res.status(200).json({
        //     status: "Enter OTP",
        //   })
      } else {
        res.status(400).json({
          status: "Password is incorect!"
        })
      }
    } else {
      res.status(400).json({
        status: "Already Login!"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString()
    })
  }
}

exports.otpVerify = async (req, res) => {
  // console.log(userData)
  // if (req.body.otp == OTP) {
  res.status(200).json({
    userData
  })
  // } else {
  //   req.session.destroy();
  //   userData = ""
  //   res.status(200).json({
  //     status: "OTP incorrect"
  //   })
  // }
  // OTP = "";
}

exports.logoutClient = async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    status: "Logout"
  })
}
