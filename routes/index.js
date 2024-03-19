var express = require('express');
var router = express.Router();
const user = require('../controller/userControlelr')
const login = require('../controller/loginController')
const seller = require('../controller/sellerController');
const { verifyToken } = require('../middleware/auth');
const { addContract, viewContract } = require('../controller/contractController');
/* GET home page. */

// Client authentication
router.post('/add-client', login.addClient);
router.get('/login-client', login.loginClient);
router.get('/logout-client', login.logoutClient);
router.post('/otpverify', login.otpVerify);

// seller
router.post('/add-bid', verifyToken, seller.addBids);
router.get('/view-bid', verifyToken, seller.viewBids);
router.post('/view-bid-post', verifyToken, seller.viewBidPost);
router.get('/view-seller', verifyToken, seller.viewSeller);


//user
router.get('/view-user', verifyToken, user.viewUser)
router.post('/add-posts', verifyToken, user.addPosts)
router.post('/view-posts', verifyToken, user.viewPosts)

//contract
router.post('/add-contract', verifyToken, addContract)
router.post('/view-contract', verifyToken, viewContract)


module.exports = router;
