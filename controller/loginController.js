require("dotenv").config();
const userModel = require("../model/authModel");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const otpModel = require("../model/otp");
var jwt = require("jsonwebtoken");
const e = require("express");
const authModel = require("../model/authModel");
const cron = require('node-cron');
exports.addClient = async (req, res) => {
  try {
    const email = req.body.email;

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "ENUMS.USER.EMAIL_ALREADY_EXIST",
      });
    }

    let existingOTP = await otpModel.findOne({ email });

    if (existingOTP != null) {
      existingOTP.otp = generateOTP();
      await existingOTP.save();
      await sendVerificationEmail(email, existingOTP.otp);
    } else {
      const OTP = generateOTP();

      await otpModel.create({ email, otp: OTP });
      await sendVerificationEmail(email, OTP);
    }

    res.status(200).json({
      status: true,
      message: "ENUMS.AUTHENTICATION.SEND_OTP",
    });
  } catch (error) {
    console.error("Error in sendotp:", error);
    res.status(500).json({
      status: false,
      message: "ENUMS.AUTHENTICATION.INTERNAL_SERVER_ERROR",
    });
  }
};

function generateOTP() {
  const digits = "0123456789";
  return Array.from(
    { length: 6 },
    () => digits[Math.floor(Math.random() * 10)]
  ).join("");
}

async function sendVerificationEmail(email, OTP) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omni.market07@gmail.com",
      pass: "yougasvmbjvoourn",
    },
  });

  const mailOptions = {
    from: "omni.market07@gmail.com",
    to: email,
    subject: "OMNI-MARKET 🌐 Secure Code - Unleash the Delivering Now!",
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

        </html>`,
  };

  await transporter.sendMail(mailOptions);
}

exports.otpVerify = async (req, res) => {
  try {
    const { otp, userData } = req.body;
    const userWithOTP = await otpModel.findOne({
      email: userData.email,
      otp: otp,
    });
    if (userWithOTP) {
      userData.password = await bcrypt.hash(userData.password, 10);

      const data = await userModel.create(userData);
      const session = data._id;

      var token = jwt.sign(
        { email: userData.email, userId: data._id },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        status: true,
        token: token,
        data,
        message: "ENUMS.AUTHENTICATION.VERIFY_OTP",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "ENUMS.AUTHENTICATION.INVALID_OTP",
      });
    }
  } catch (error) {
    console.error("Error in verifyotp:", error);
    res.status(500).json({
      status: false,
      message: "ENUMS.AUTHENTICATION.INTERNAL_SERVER_ERROR",
    });
  }
};

exports.loginClient = async (req, res) => {
  try {
    const data = await userModel.find({ email: req.body.email, isDeleted:false });
    var solved = bcrypt.compare(req.body.password, data[0].password);
    if (solved) {
      var token = jwt.sign(
        { email: req.body.email, userId: data[0]._id },
        process.env.SECRET_KEY
      );
      // if (data[0].role === 'buyer') {
      //   req.session.b_id = data[0]._id
      //   console.log('session', req.session.b_id);
      // } else if (data[0].role === 'seller') {
      //   req.session.s_id = data[0]._id
      // }
      res.status(200).json({
        data,
        token,
      });
    } else {
      res.status(400).json({
        status: "Password is incorect!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.toString(),
    });
  }
};

exports.logoutClient = async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    status: "Logout",
  });
};


exports.addSubscription = async (req, res) => {
  try {
    const { id, subscription_type } = req.body;
    var start_date = new Date();
    var end_date;

    switch (subscription_type) {
      case 'platinum':
        end_date = new Date(start_date.getFullYear() + 1, start_date.getMonth(), start_date.getDate());
        break;
      case 'gold':
        end_date = new Date(start_date.getFullYear(), start_date.getMonth() + 6, start_date.getDate());
        break;
      case 'silver':
        end_date = new Date(start_date.getFullYear(), start_date.getMonth() + 1, start_date.getDate());
        break;
      default:
        throw new Error('Invalid subscription type');
    }

    const data = await authModel.findByIdAndUpdate(id, {
      subscription_type: subscription_type,
      start_date: start_date,
      end_date: end_date,
      isVerified: true
    });

    if (data != null) {
      return res.status(200).json({
        status: true,
        data: data
      });
    }
    return res.status(200).json({
      status: false,
      msg: "Data not found"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.toString(),
    });
  }
};


cron.schedule('0 0 * * *', async () => {
  try {
    const current_date = new Date();
    const expiredSubscriptions = await authModel.find({ end_date: { $lt: current_date } });
    
    if (expiredSubscriptions.length > 0) {
      for (const subscription of expiredSubscriptions) {
        await authModel.findByIdAndUpdate(subscription._id, {
          subscription_type: null,
          start_date: null,
          end_date: null,
          isVerified: false
        });
      }
      console.log('Expired subscriptions updated successfully.');
    } else {
      console.log('No expired subscriptions found.');
    }
  } catch (error) {
    console.error('Error updating expired subscriptions:', error);
  }
});