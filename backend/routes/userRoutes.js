const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { UpdateEmail, UpdateName,getProfile } = require("../controllers/userController");
const router = express.Router();


router.get("/dashboard", verifyToken);
router.get("/profile", verifyToken);
router.get("/monthly-expense", verifyToken);
router.get("/yearly-expense", verifyToken);
router.get("/goals", verifyToken);
router.get("/ai-chat", verifyToken);
router.get("/get-profile",verifyToken,getProfile);
router.put("/update-email", verifyToken, UpdateEmail);
router.put("/update-name", verifyToken, UpdateName);

module.exports = router;