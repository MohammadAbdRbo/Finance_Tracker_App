
const pool = require('../config/db');  // الاتصال بقاعدة البيانات

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0]; // إرجاع أول مستخدم بالنتيجة
  } catch (err) {
    console.error("❌ Error getting user by email:", err);
    throw err;
  }
};

const createUser = async (full_name, email, hashedPassword) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password) 
      VALUES ($1, $2, $3) RETURNING *`,
      [full_name, email, hashedPassword]
    );
    return result.rows[0]; // إرجاع المستخدم الذي تم إضافته
  } catch (err) {
    console.error("❌ Error creating user:", err);
    throw err;
  }
};

const blacklistToken = async (token) => {
  try {
    const result = await pool.query("INSERT INTO blacklisted_tokens (token) VALUES ($1) RETURNING id", [token]);
    return result.rows[0]; // إرجاع نتيجة إضافة التوكن
  } catch (err) {
    console.error("❌ Error blacklisting token:", err);
    throw err;
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  blacklistToken
};
