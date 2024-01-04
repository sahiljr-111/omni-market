var express = require('express');
var router = express.Router();
const user = require('../controller/userControlelr')
const login = require('../controller/loginController')
const seller = require('../controller/sellerController')
/* GET home page. */

// Client authentication
router.post('/add-client',login.addClient );
router.get('/login-client',login.loginClient );
router.get('/logout-client',login.logoutClient );
router.get('/otpverify',login.otpVerify );


// seller
router.get('/view-seller',seller.viewSeller );


//user
router.get('/view-user',user.viewUser)
module.exports = router;
