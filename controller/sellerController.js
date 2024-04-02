const userModel = require("../model/authModel");
const bidModel = require("../model/bidModel");

exports.viewSeller = async (req, res) => {
  try {
    console.log(req.user.email);
    if (req.user.email) {
      const data = await userModel.find(
        { role: "seller", isDeleted: false },
        { password: 0 }
      );
      if (data != "") {
        res.status(200).json({
          status: "Fetching success!",
          data,
        });
      } else {
        res.status(400).json({
          message: "not found seller",
        });
      }
    } else {
      res.status(400).json({
        message: "Unauthorised!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

exports.addBids = async (req, res) => {
  try {
    const data = await userModel.find({
      email: req.user.email,
      role: "seller",
      isDeleted: false,
    });
    if (data != "") {
      console.log("sess", req.user.userId);
      // var logSellerId = req.session.s_id;
      // req.body.seller_id = logSellerId
      var addData = await bidModel.create(req.body);
      res.status(200).json({
        status: "Success",
        addData,
        data,
      });
    } else {
      res.status(200).json({
        status: "You are buyer",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.viewBids = async (req, res) => {
  try {
    if (req.user.email) {
      if (req.user.userId) {
        // const logSellerId = req.session.s_id;
        const data = await bidModel
          .find({ seller_id: req.user.userId, is_deleted: false })
          .populate("seller_id", "-password");
        if (data != "") {
          res.status(200).json({
            status: "success",
            data,
          });
        } else {
          res.status(200).json({
            status: "false",
            message: "Data not Found",
          });
        }
      } else {
        res.status(400).json({
          staus: "false",
          message: "session is empty",
        });
      }
    } else {
      res.status(400).json({
        message: "LoginFirst",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.viewBidPost = async (req, res) => {
  try {
    if (req.user.email) {
      // console.log('->req.user.email --->', req.user.email);
      // console.log("->session", req.session.b_id);
      // if (req.session.b_id) {
      const data = await bidModel
        .find({ post_id: req.body.post_id })
        .populate("post_id")
        .populate("seller_id", "-password");
      if (data != "") {
        res.status(200).json({
          status: "success",
          data,
        });
      } else {
        res.status(200).json({
          status: "false",
          message: "Data not Found",
        });
      }
      // } else {
      //   res.status(400).json({
      //     staus: "false",
      //     message: "session is empty"
      //   })
      // }
    } else {
      res.status(400).json({
        message: "LoginFirst",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
