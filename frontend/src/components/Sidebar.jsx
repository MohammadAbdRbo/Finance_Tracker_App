import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaChartLine } from 'react-icons/fa'; // Using Font Awesome icons

const Sidebar = () => {
    return (
        <div className="bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
            <h3 className="text-center mb-4">Dashboard</h3>
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link href="/" className="text-white">
                        <FaHome className="mr-2" /> Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/profile" className="text-white">
                        <FaUser className="mr-2" /> Profile
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/settings" className="text-white">
                        <FaCog className="mr-2" /> Settings
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/reports" className="text-white">
                        <FaChartLine className="mr-2" /> Reports
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Sidebar;
