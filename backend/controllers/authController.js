const User = require("../models/User");  // استيراد نموذج المستخدم
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
// تسجيل مستخدم جديد
const registerUser = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        
        // إنشاء مستخدم جديد
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser(full_name, email, hashedPassword);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // البحث عن المستخدم في قاعدة البيانات
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "❌ Invalid email or password" });
      }
  
      // مقارنة كلمة المرور المُدخلة مع المخزنة في قاعدة البيانات
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "❌ Invalid email or password" });
      }
  
      // إنشاء JSON Web Token (JWT)
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "7d" } // انتهاء الصلاحية بعد 7 أيام
      );
  
      // إرسال بيانات المستخدم بدون كلمة المرور
      res.status(200).json({
        message: "✅ Login successful",
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          token: token,
        },
      });
  
    } catch (err) {
      console.error("❌ Error logging in user:", err);
      res.status(500).json({ error: "Server error occurred during login." });
    }
  };

  const logoutUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ error: "No token provided" });
  
    try {
      await pool.query("INSERT INTO blacklisted_tokens (token) VALUES ($1)", [token]);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      if (error.code === "23505") { // منع تكرار نفس التوكن
        return res.status(400).json({ error: "Token already logged out" });
      }
      res.status(500).json({ error: "Database error" });
    }
  };
  

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
