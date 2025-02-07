const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");  // استيراد الاتصال بقاعدة البيانات
const app = express();
const PORT = process.env.PORT || 5000;

// تحميل المتغيرات البيئية من ملف .env
dotenv.config();

// إعدادات الوسطاء (middleware)
app.use(cors());  // تمكين CORS
app.use(express.json());  // لتحليل البيانات بتنسيق JSON في الطلبات

// استيراد المسارات الخاصة بالمستخدم
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);  // توجيه المسارات إلى /api/users




// التحقق من الاتصال بقاعدة البيانات عند بدء التطبيق
(async () => {
  try {
    const res = await pool.query("SELECT NOW();");
    console.log("✅ Connection successful, current time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Error connecting to the database: ", err.message);
  }
})();
app.use((err, req, res, next) => {
  console.error("❌ Error occurred:", err); // طباعة الخطأ
  res.status(500).send({ error: "Internal Server Error" });
});

// بدء تشغيل الخادم على البورت المحدد
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
