
const User = require('../models/User'); // تأكد من مسار الملف





const getProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // التأكد من أن `req.user` ليس undefined
      
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is missing or invalid" });
      }
  
      const user = await getEmailNameUser(userId); // استدعاء الدالة من المودل
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(user); // إرسال البيانات إلى الـ frontend
    } catch (error) {
      console.error("❌ Error getting profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  const UpdateEmail = async (req, res) => {
    try {
        const { email, userId } = req.body;  // Get email and userId from request body
        console.log("req.body::",req.body);
        if (!userId) {
            return res.status(400).json({ error: "❌ User ID is required" });
        }
        console.log("req.body::",req.body);
        const result = await User.updateEmail(userId, email);  // Pass userId to updateEmail function
        res.status(200).json({ message: "✅ Email updated successfully", user: result });
    } catch (err) {
        console.error("❌ Error updating email:", err);
        res.status(500).json({ error: "❌ Error updating email" });
    }
};

const UpdateName = async (req, res) => {
  try {
      const { full_name } = req.body;
      const userId = req.user.userId; // الحصول على userId من الميدل وير

      console.log("req.userId::", userId);
      if (!userId) {
          return res.status(400).json({ error: "❌ User ID is required" });
      }

      const result = await User.updateName(full_name, userId);
      res.status(200).json({ message: "✅ Name updated successfully", user: result });
  } catch (err) {
      console.error("❌ Error updating name:", err);
      res.status(500).json({ error: "❌ Error updating name" });
  }
};


module.exports = {
    UpdateEmail,
    UpdateName,
    getProfile
};