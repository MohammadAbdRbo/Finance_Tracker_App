import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome icon for profile
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        // إرسال التوكن في رأس الطلب Authorization
        await axios.post("http://localhost:5000/api/users/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`, // إرسال التوكن هنا في رأس الطلب
          },
        });

        // مسح الـ token من المتصفح
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
};


  return (
    <Navbar bg="dark" variant="dark" className="p-3">
      <Navbar.Brand href="#">Finance Dashboard</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/profile" className="text-white">
          <FaUserCircle size={24} className="mr-2" /> Profile
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="text-white">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
