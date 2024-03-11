var express = require('express');
var router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { loginAdmin, allSeller, allBuyer, allClient, chart, adminViewBids, adminViewPosts, sellerDetails, buyerDetails } = require('../controller/adminController');
const { addDiamond, viewDiamond } = require('../controller/diamondController');

router.post('/login', loginAdmin);
router.post('/addDiamond', verifyToken, addDiamond);
router.get('/allSeller', verifyToken, allSeller);
router.get('/allBuyer', verifyToken, allBuyer);
router.get('/allClient', verifyToken, allClient);
router.get('/viewDiamond', viewDiamond);
router.get('/viewBids', verifyToken, adminViewPosts);
router.get('/viewPosts', verifyToken, adminViewBids);
router.get('/chart', chart);


//individual
router.get('/seller-details/:id', verifyToken, sellerDetails);
router.get('/buyer-details/:id', verifyToken, buyerDetails);

module.exports = router;
