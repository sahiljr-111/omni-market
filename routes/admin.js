var express = require('express');
var router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { loginAdmin, allSeller, allBuyer, allClient } = require('../controller/adminController');
const { addDiamond, viewDiamond } = require('../controller/diamondController');

router.get('/login', loginAdmin);
router.get('/allSeller', verifyToken, allSeller);
router.get('/allBuyer', verifyToken, allBuyer);
router.get('/allClient', verifyToken, allClient);
router.get('/addDiamond', verifyToken, addDiamond);
router.get('/viewDiamond', verifyToken, viewDiamond);

module.exports = router;
