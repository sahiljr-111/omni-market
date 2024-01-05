var express = require('express');
var router = express.Router();
const user = require('../controller/userControlelr')
const login = require('../controller/loginController')
const seller = require('../controller/sellerController');
const { addDiamond,viewDiamond } = require('../controller/diamondController');
const multer  = require('multer');
const { addPosts, viewPosts } = require('../controller/postsController');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
/* GET home page. */

// Client authentication
router.post('/add-client', upload.single('profile'),login.addClient );
router.get('/login-client',login.loginClient );
router.get('/logout-client',login.logoutClient );
router.get('/otpverify',login.otpVerify );

// seller
router.get('/view-seller',seller.viewSeller );


//user
router.get('/view-user',user.viewUser)
router.post('/add-posts',addPosts)
router.get('/view-posts',viewPosts)


// admin
router.post('/admin/add-diamond',addDiamond)
router.get('/admin/view-diamond',viewDiamond)
module.exports = router;
