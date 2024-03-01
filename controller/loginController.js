require('dotenv').config()
const userModel = require('../model/authModel')
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
const e = require('express');
var userData = [];
var OTP = ""

exports.addClient = async (req, res) => {
  try {
    data = req.body
    const existingUser = await userModel.find({ email: data.email })
    console.log('✌️existingUser --->', existingUser);
    if (existingUser != '') {
      res.status(400).json({
        status: "false",
        message: "User Already Exist!"
      })
    } else {
      if (data) {
        console.log(data);
        userData[0] = data;
        var digits = '0123456789';
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log(OTP)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'omni.market07@gmail.com',
            pass: 'yougasvmbjvoourn'
          }
        });

        var mailOptions = {
          from: 'omni.market07@gmail.com',
          to: req.body.email,
          subject: 'OMNI-MARKET 🌐 Secure Code - Unleash the Delivering Now!',
          html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
              text-align: center;
            }
        
            .header {
              background-color: #673ab7;
              color: #fff;
              padding: 20px;
              border-bottom-left-radius: 30px;
              border-bottom-right-radius: 30px;
            }
        
            .company-name {
              font-size: 36px;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 10px;
            }
        
            .company-logo {
              width: 100px;
              height: auto;
              margin-bottom: 20px;
            }
        
            .ad-container {
              background-color: #fff;
              border-radius: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              max-width: 500px;
              margin: 20px auto;
              padding: 40px;
            }
        
            .otp {
              background-color: #673ab7;
              color: #fff;
              padding: 10px 20px;
              border-radius: 10px;
              font-size: 24px;
              font-weight: bold;
              display: inline-block;
              margin-bottom: 20px;
            }
        
            .cta-button {
              background-color: #673ab7;
              color: #fff;
              border: none;
              border-radius: 30px;
              padding: 15px 40px;
              font-size: 20px;
              cursor: pointer;
              transition: background-color 0.3s ease;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
            }
        
            .cta-button:hover {
              background-color: #512da8;
            }
        
            .instructions {
              text-align: left;
              margin-bottom: 20px;
            }
        
            .instructions ol {
              margin-left: 20px;
              padding-left: 0;
            }
        
            .instructions ol li {
              margin-bottom: 10px;
              list-style-type: decimal;
              font-size: 18px;
              color: #555;
            }
        
            .footer {
              color: #666;
              font-size: 14px;
              margin-top: 15%;
            }
        
            .footer a {
              color: #673ab7;
              text-decoration: none;
            }
          </style>
        </head>
        
        <body>
          <div class="header">
            <h1 class="company-name"> OMNI MARKET </h1>
            <p>Your Ultimate Diamond Companion</p>
          </div>
          <div class="ad-container">
            <p>🎉 Welcome to <span class="company-name">OMNI-MARKET🌐 </span></p>
            <p>Embark on a revolutionary Marketing experience with us! We're not just an app; we're your go-to marketplace for
              discovering the latest trends, unlocking exclusive deals, and indulging in a seamless shopping journey.</p>
        
            <h2>Your OTP - <span class="otp">${OTP}</span> 🤫 Keep it secret!</h2>
            <p>To enhance your shopping security, we've sent you a unique OTP. Think of it as your golden ticket to unlock
              exclusive features and promotions within the app.</p>
        
            <p></p>
        
            <div class="instructions">
              <h3>Instructions:</h3>
              <ol>
                <li>Open OMNI-MARKET App.</li>
                <li>Navigate to the login screen.</li>
                <li>Enter your email and use the OTP to unlock a world of diamonds!</li>
              </ol>
            </div>
        
            <p class="footer">Happy Marketing!<br>The <span class="company-name">OMNI-MARKET</span> Team 🛒</p>
          </div>
        </body>
        
        </html>`
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
          // token
        })
      } else {
        res.status(400).json({
          status: 'data not found!'
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.toString()
    })
  }
}

exports.otpVerify = async (req, res) => {
  console.log(userData)
  if (req.body.otp == OTP) {
    userData[0].password = await bcrypt.hash(userData[0].password, 10)
    const data = await userModel.create(userData[0]);
    var token = jwt.sign({ email: data.email }, process.env.SECRET_KEY);
    if (data.role == 'buyer') {
      req.session.b_id = data._id
    } else if (data.role == 'seller') {
      req.session.s_id = data._id
    }
    OTP = ''
    res.status(200).json({
      data,
      token
    })
  } else {
    await userModel.findOneAndDelete({ email: userData[0].email })
    res.status(200).json({
      status: "OTP incorrect"
    })
  }
}

exports.loginClient = async (req, res) => {
  try {
    const data = await userModel.find({ email: req.body.email });
    console.log(data._id);
    var solved = bcrypt.compare(req.body.password, data[0].password);
    if (solved) {
      var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
      if (data.role == 'buyer') {
        req.session.b_id = data._id
      } else if (data.role == 'seller') {
        req.session.s_id = data._id
      }
      res.status(200).json({
        data,
        token
      })
    } else {
      res.status(400).json({
        status: "Password is incorect!"
      })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString()
    })
  }
}



exports.logoutClient = async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    status: "Logout"
  })
}
