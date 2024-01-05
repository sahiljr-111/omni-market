const userModel = require('../model/authModel')
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var userData = [];
var OTP = ""
exports.addClient = async (req, res) => {
  try {
    if (!req.file) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      const data = await userModel.create(req.body);
      if (data) {
        userData[0] = data;
        var digits = '0123456789';
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log(OTP)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'sahiljr1093@gmail.com',
            pass: 'jbmoezfmthcilimv'
          }
        });

        var mailOptions = {
          from: 'sahiljr1093@gmail.com',
          to: req.body.email,
          subject: 'OMNI-MARKET 🌐 Secure Code - Unleash the Delivering Now!',
          text: `🚀 Welcome to OMNI-MARKET - Your Ultimate Diamond Companion!
        Embark on a revolutionary Marketing experience with OMNI-MARKET! We're not just an app; we're your go- to marketplace for discovering the latest trends, unlocking exclusive deals, and indulging in a seamless shopping journey.
      
        🎁 Your One - Time Passcode(OTP) - Your Key to Savings!
        To enhance your shopping security, we've sent you a unique OTP. Think of it as your golden ticket to unlock exclusive features and promotions within the app.
      
        🔓 Redeem Your OTP: ${OTP} 
      
        🚨 Note: Your OTP is confidential.Do not share it with anyone.

        Open OMNI-MARKET.
        Navigate to the login screen.
        Enter your email and use the OTP to unlock a world of savings!
      
        Happy Marketing!
        The OMNI-DEVELOPER Team 🛒`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({
          status: "Enter OTP",
        })
      } else {
        res.status(400).json({
          status: 'data not found!'
        })
      }
    } else {
      console.log(req.file.originalname);
      req.body.profile = req.file.originalname
      req.body.password = await bcrypt.hash(req.body.password, 10)
      const data = await userModel.create(req.body);
      if (data) {
        userData[0] = data;
        var digits = '0123456789';
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log(OTP)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'sahiljr1093@gmail.com',
            pass: 'jbmoezfmthcilimv'
          }
        });

        var mailOptions = {
          from: 'sahiljr1093@gmail.com',
          to: req.body.email,
          subject: 'OMNI-MARKET 🌐 Secure Code - Unleash the Delivering Now!',
          text: `🚀 Welcome to OMNI-MARKET - Your Ultimate Diamond Companion!
        Embark on a revolutionary Marketing experience with OMNI-MARKET! We're not just an app; we're your go- to marketplace for discovering the latest trends, unlocking exclusive deals, and indulging in a seamless shopping journey.
      
        🎁 Your One - Time Passcode(OTP) - Your Key to Savings!
        To enhance your shopping security, we've sent you a unique OTP. Think of it as your golden ticket to unlock exclusive features and promotions within the app.
      
        🔓 Redeem Your OTP: ${OTP} 
      
        🚨 Note: Your OTP is confidential.Do not share it with anyone.

        Open OMNI-MARKET.
        Navigate to the login screen.
        Enter your email and use the OTP to unlock a world of savings!
      
        Happy Marketing!
        The OMNI-DEVELOPER Team 🛒`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({
          status: "Enter OTP",
        })
      } else {
        res.status(400).json({
          status: 'data not found!'
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      status:"error",
      error: error.toString()
    })
  }
}

exports.loginClient = async (req, res) => {
  try {
    if (!req.session.email) {
      const data = await userModel.find({ email: req.body.email });
      var solved = await bcrypt.compare(req.body.password, data[0].password);
      if (solved) {
        req.session.email = data[0].email;
        req.session.save();
        req.session.b_id = data[0].id
        req.session.save();
        console.log(req.session.email);
        res.status(200).json({
          data
        })
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
  console.log(userData)
  if (req.body.otp == OTP) {
    OTP=''
    res.status(200).json({
      userData,
    })
  } else {
    res.status(200).json({
      status: "OTP incorrect"
    })
  }
}

exports.logoutClient = async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    status: "Logout"
  })
}
