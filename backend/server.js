const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db"); 
const app = express();
const PORT = process.env.PORT || 5000;

// تحميل المتغيرات البيئية من ملف .env
dotenv.config();

// إعدادات الوسطاء (middleware)
app.use(cors());  // تمكين CORS
app.use(express.json());  // لتحليل البيانات بتنسيق JSON في الطلبات
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// استيراد المسارات الخاصة بالمستخدم
const userRoutes = require("./routes/authRoutes");
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


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  
});

process.on("rejectionHandled", (reason) => {
  console.error("❌ Rejection Handled:", reason);
  
});