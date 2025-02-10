const pool = require("../config/db");  // استيراد الاتصال بقاعدة البيانات
const bcrypt = require("bcrypt");
// وظيفة لإضافة مستخدم جديد
const createUser = async (full_name, email, hashedPassword) => {
    try {
        // 🔍 طباعة البيانات للتحقق
        console.log("🔹 Creating user with:", { full_name, email, hashedPassword });

        const result = await pool.query(
            `INSERT INTO users (full_name, email, password) 
            VALUES ($1, $2, $3) RETURNING *`,
            [full_name, email, hashedPassword] // بيانات المستخدم
        );

        console.log("✅ User created successfully:", result.rows[0]);
        return result.rows[0]; // إرجاع المستخدم المضاف
    } catch (err) {
        console.error("❌ Error creating user:", err.message);
        throw err; // رمي الخطأ ليتعامل معه الـ controller
    }
};


const getUserByEmail = async (email) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    } catch (err) {
        console.error("Error getting user by email:", err);
        throw err;
    }
};




module.exports = {
    createUser,
    getUserByEmail
    
};
