const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser); // تسجيل مستخدم جديد
router.post("/login", loginUser); // تسجيل الدخول

module.exports = router;
