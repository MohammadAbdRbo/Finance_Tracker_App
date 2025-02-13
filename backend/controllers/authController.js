const User = require("../models/User");  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const registerUser = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        
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
  
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "❌ Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "❌ Invalid email or password" });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "zxczxczxcasvdasdvasvavasva",
        { expiresIn: "7d" } 
      );
  
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
      if (error.code === "23505") {
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
