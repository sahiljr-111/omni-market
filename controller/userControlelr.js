const authModel = require("../model/authModel");
const userModel = require("../model/authModel");
const postModel = require("../model/postsModel");

exports.viewUser = async (req, res) => {
  try {
    if (req.user.email) {
      const data = await userModel.find({ role: "buyer", isDeleted: false });
      if (data != "") {
        res.status(200).json({
          status: "Fatching successfull",
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

exports.addPosts = async (req, res) => {
  try {
    const data = await userModel.find({
      email: req.user.email,
      role: "buyer",
      isDeleted: false,
    });
    if (data != "") {
      // var logUserId = req.session.b_id;
      // req.body.buyer_id = logUserId
      var addData = await postModel.create(req.body);
      res.status(200).json({
        status: "Success",
        addData,
        data,
      });
    } else {
      res.status(502).json({
        status: "You are seller",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

exports.viewPosts = async (req, res) => {
  try {
    if (req.user.email) {
      const sellerData = await authModel.find({ email: req.user.email, isDeleted:false });
      if (sellerData[0].role == "seller") {
        const data = await postModel.find().populate("buyer_id", "-password");
        if (data != "") {
          res.status(200).json({
            status: "Success",
            data,
          });
        } else {
          res.status(200).json({
            status: "false",
            message: "Data not found",
          });
        }
      } else {
        // if (req.session.b_id) {
        //   const logUserId = req.session.b_id
        const data = await postModel
          .find({ buyer_id: req.body.buyer_id, isDeleted:false })
          .populate("buyer_id", "-password");
        if (data != "") {
          res.status(200).json({
            status: "Success",
            data,
          });
        } else {
          res.status(200).json({
            status: "false",
            message: "Data not found",
          });
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
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

exports.deletePost = async (req,res)=>{
  try {
    const post = await postModel.findById(req.body.id);
    if (!post.isDeleted) {
      await postModel.findByIdAndUpdate(req.body.id, { isDeleted: true });
      const data = await postModel.findById(req.body.id);
      res.status(200).json({
        status: true,
        message: "Post deleted successfully",
        data,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Post Already deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userData = await authModel.findById({ _id: req.body.id });
    if (userData != "") {
      await authModel.findByIdAndUpdate(req.body.id, req.body);
      const data = await authModel.findById({ _id: req.body.id });
      res.status(200).json({
        status: true,
        data,
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
exports.deleteProfile = async (req, res) => {
  try {
    const userData = await authModel.findById({ _id: req.body.id });
    if (userData != "") {
      await authModel.findByIdAndUpdate(req.body.id, { isDeleted: true });
      const data = await authModel.findById({ _id: req.body.id });
      res.status(200).json({
        status: true,
        data,
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
