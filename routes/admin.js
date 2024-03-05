var express = require('express');
var router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { loginAdmin, allSeller, allBuyer, allClient, chart } = require('../controller/adminController');
const { addDiamond, viewDiamond } = require('../controller/diamondController');

router.post('/login', loginAdmin);
router.post('/addDiamond', verifyToken, addDiamond);
router.get('/allSeller', verifyToken, allSeller);
router.get('/allBuyer', verifyToken, allBuyer);
router.get('/allClient', verifyToken, allClient);
router.get('/viewDiamond', verifyToken, viewDiamond);
router.get('/chart', chart);

module.exports = router;
