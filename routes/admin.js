var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  loginAdmin,
  allSeller,
  allBuyer,
  allClient,
  chart,
  adminViewBids,
  adminViewPosts,
  sellerDetails,
  buyerDetails,
  updatebuyer,
  updateseller,
  deletebuyer,
  deleteseller,
  allDeleteClient,
  restoreClient,
  viewAllContracts,
} = require("../controller/adminController");
const { addDiamond, viewDiamond } = require("../controller/diamondController");

router.post("/login", loginAdmin);
router.post("/addDiamond", verifyToken, addDiamond);
router.get("/allSeller", allSeller);
router.get("/allBuyer", verifyToken, allBuyer);
router.get("/allClient", verifyToken, allClient);
router.get("/viewDiamond", viewDiamond);
router.get("/viewPosts", verifyToken, adminViewPosts);
router.get("/viewBids", verifyToken, adminViewBids);
router.get("/viewContracts", verifyToken, viewAllContracts);
router.get("/chart", chart);
router.patch("/update/buyer/:id", verifyToken, updatebuyer);
router.patch("/update/seller/:id", verifyToken, updateseller);
router.delete("/delete/buyer/:id", verifyToken, deletebuyer);
router.delete("/delete/seller/:id", verifyToken, deleteseller);
router.get("/delete/client", verifyToken, allDeleteClient);
router.get("/restore/client/:id", verifyToken, restoreClient);

//individual
router.get("/seller-details/:id", verifyToken, sellerDetails);
router.get("/buyer-details/:id", verifyToken, buyerDetails);

module.exports = router;
