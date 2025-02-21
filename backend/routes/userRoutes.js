const express = require("express");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();


router.get("/dashboard", verifyToken);
router.get("/profile", verifyToken);
router.get("/monthly-expense", verifyToken);
router.get("/yearly-expense", verifyToken);
router.get("/goals", verifyToken);
router.get("/ai-chat", verifyToken);

module.exports = router;