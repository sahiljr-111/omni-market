var express = require('express');
var router = express.Router();
const user = require('../controller/userControlelr')
const login = require('../controller/loginController')
const seller = require('../controller/sellerController');
const { addDiamond, viewDiamond } = require('../controller/diamondController');
const { vetifyToken } = require('../middleware/auth');
/* GET home page. */

// Client authentication
router.post('/add-client', login.addClient);
router.get('/login-client', login.loginClient);
router.get('/logout-client', login.logoutClient);
router.get('/otpverify', login.otpVerify);

// seller
router.get('/view-seller', vetifyToken, seller.viewSeller);


//user
router.get('/view-user', vetifyToken, user.viewUser)
router.post('/add-posts', user.addPosts)
router.get('/view-posts', user.viewPosts)


// admin
router.post('/admin/add-diamond', addDiamond)
router.get('/admin/view-diamond', viewDiamond)
module.exports = router;
