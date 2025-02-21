require("dotenv").config(); // تحميل المتغيرات البيئية في البداية
const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); 

const app = express();
const PORT = process.env.PORT || 5000;

// إعدادات CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// تمكين قراءة بيانات JSON من الطلبات
app.use(express.json());

// استيراد المسارات الخاصة بالمستخدم
const userRoutes = require("./routes/authRoutes");
const UserDashboard = require("./routes/userRoutes");

// توجيه المسارات الخاصة بالتسجيل وتسجيل الدخول إلى المسار /api/users
app.use("/api/users", userRoutes);

// توجيه المسارات الخاصة بلوحة تحكم المستخدم إلى المسار /api/users/dashboard
app.use("/api/users/dashboard", UserDashboard);

// التحقق من الاتصال بقاعدة البيانات عند بدء التشغيل
(async () => {
  try {
    const res = await pool.query("SELECT NOW();");
    console.log("✅ Connection successful, current time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // إيقاف التشغيل في حالة فشل الاتصال بقاعدة البيانات
  }
})();

// التعامل مع الأخطاء العامة
app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// التعامل مع الأخطاء الغير متوقعة لمنع انهيار السيرفر
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1); // إنهاء التطبيق بعد خطأ غير متوقع
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
});
