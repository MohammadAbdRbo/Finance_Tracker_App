import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const token = localStorage.getItem("token");

// ✅ دالة استخراج userId من التوكن
const extractUserIdFromToken = (token) => {
  if (!token) {
    console.error("❌ التوكن غير موجود أو غير صالح");
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || null; // التأكد من أن `userId` هو المفتاح الصحيح
  } catch (error) {
    console.error("❌ خطأ في تحليل التوكن:", error);
    return null;
  }
};

// ✅ تمرير التوكن إلى الدالة
const userId = extractUserIdFromToken(token);
console.log("Extracted userId:", userId);
const Profile = () => {
  const [profile, setProfile] = useState({ full_name: "", email: "", user_id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [newProfile, setNewProfile] = useState({ full_name: "", email: "" });

  // ✅ تحميل بيانات المستخدم عند فتح الصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ التوكن غير موجود في LocalStorage!");
      return;
    }

    const userId = extractUserIdFromToken(token);
    if (!userId) {
      console.error("❌ `userId` غير موجود في التوكن!");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/dashboard/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📌 بيانات المستخدم:", response.data);
        setProfile({ ...response.data, user_id: userId }); // ✅ حفظ `userId`
        setNewProfile(response.data);
      } catch (error) {
        console.error("❌ خطأ في جلب البيانات:", error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ تحديث الاسم
  const handleSaveName = async () => {
    const token = localStorage.getItem("token");
    if (!token || !profile.user_id) {
      console.error("❌ يجب تسجيل الدخول أو التوكن غير صالح!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/dashboard/update-name",
        { full_name: newProfile.full_name, user_id: profile.user_id },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("❌ خطأ في تحديث الاسم:", error);
    }
  };

  // ✅ تحديث البريد الإلكتروني
  const handleSaveEmail = async () => {
    const token = localStorage.getItem("token");
    if (!token || !profile.user_id) {
      console.error("❌ يجب تسجيل الدخول أو التوكن غير صالح!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/dashboard/update-email",
        { email: newProfile.email, user_id: profile.user_id },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("❌ خطأ في تحديث البريد الإلكتروني:", error);
    }
  };

  // ✅ تحديث الحقول عند الكتابة
  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  // ✅ إلغاء التعديلات
  const handleCancel = () => {
    setNewProfile(profile);
    setIsEditing(false);
  };

  return (
    <Container fluid>
      <Row>
        {/* الشريط الجانبي */}
        <Col md={3} className="p-0">
          <Sidebar />
        </Col>

        {/* المحتوى الرئيسي */}
        <Col xs={12} md={9} className="mt-4">
          <h2 className="text-center mb-4">الملف الشخصي</h2>

          <Card className="p-4 shadow-sm rounded">
            <Card.Body>
              {!isEditing ? (
                <>
                  <h4>تفاصيل الحساب</h4>
                  <p><strong>الاسم:</strong> {profile.full_name}</p>
                  <p><strong>البريد الإلكتروني:</strong> {profile.email}</p>

                  <Button variant="primary" onClick={() => setIsEditing(true)} className="mt-3">
                    تعديل الملف الشخصي
                  </Button>
                </>
              ) : (
                <>
                  <h4>تعديل الملف الشخصي</h4>
                  <Form>
                    <Form.Group controlId="full_name">
                      <Form.Label>الاسم</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        value={newProfile.full_name}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="email" className="mt-2">
                      <Form.Label>البريد الإلكتروني</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={newProfile.email}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <div className="mt-3 d-flex gap-2">
                      <Button variant="secondary" onClick={handleCancel}>إلغاء</Button>
                      <Button variant="primary" onClick={handleSaveName}>حفظ الاسم</Button>
                      <Button variant="primary" onClick={handleSaveEmail}>حفظ البريد</Button>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
