const express = require("express");
const { registerUser, loginUser, logoutUser,verifyToken } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", verifyToken);

module.exports = router;
