import React, { useEffect } from 'react';  // إضافة useEffect هنا
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Content from '../components/Contant';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    
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
