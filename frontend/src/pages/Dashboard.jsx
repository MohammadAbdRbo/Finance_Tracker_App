import React, { useEffect } from 'react';  // إضافة useEffect هنا
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Content from '../components/Contant';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        
    
        if (!token) {
            console.warn("No token found. Redirecting to login.");
            navigate("/login");
        } else {
            axios
                .get("/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("Dashboard data:", response.data);
                })
                .catch((error) => {
                    console.error("Unauthorized access, redirecting to login:", error);
                    navigate("/login");
                });
        }
    }, [navigate]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <Content />
            </div>
        </div>
    );
}

export default Dashboard;
