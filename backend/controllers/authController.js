// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User"); // استيراد دوال النموذج

// دالة لتسجيل الدخول
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ message: "❌ Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, full_name: user.full_name },
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" }
    );
    
    res.status(200).json({
      message: "✅ Login successful",
      user: {
        id: user.user_id,
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

// دالة للتسجيل
const registerUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(full_name, email, hashedPassword);

    res.status(201).json({
      message: "✅ User registered successfully",
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("❌ Error registering user:", err);
    res.status(500).json({ error: "Server error occurred during registration." });
  }
};

// دالة لتسجيل الخروج
const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ error: "❌ No token provided" });

  try {
    const result = await User.blacklistToken(token);
    res.json({ message: "✅ Logged out successfully" });
  } catch (error) {
    console.error("❌ Error logging out:", error);
    res.status(500).json({ error: "❌ Error logging out" });
  }
};

// دالة للتحقق من التوكن
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "❌ No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "❌ Invalid or expired token" });
    }

    req.user = decoded; // تعيين `decoded` إلى `req.user`
    
    next();
  });
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken
};
