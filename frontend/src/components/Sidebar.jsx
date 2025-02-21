import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUser,FaChartLine,FaFileInvoiceDollar,FaRegCalendarAlt,FaBullseye,FaRobot,FaMoneyBillWave } from 'react-icons/fa'; // Using Font Awesome icons

const Sidebar = () => {
    return (
        <div className="bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
            <h3 className="text-center mb-4">Dashboard</h3>
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link href="dashboard" className="text-white">
                        <FaHome className="mr-2" /> Dashboard
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/finance-summary" className="text-white">
                        <FaMoneyBillWave className="mr-2" /> Finance Summary
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/profile" className="text-white">
                        <FaUser className="mr-2" /> Profile
                    </Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link href="/reports" className="text-white">
                        <FaChartLine className="mr-2" /> Reports
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/monthly-expense" className="text-white">
                        <FaFileInvoiceDollar className="mr-2" /> Monyhly Expenses
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/yearly-expense" className="text-white">
                        <FaRegCalendarAlt className="mr-2" /> Yearly Expenses
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/goals" className="text-white">
                        <FaBullseye className="mr-2" /> Goals
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/ai-chat" className="text-white">
                        <FaRobot className="mr-2" /> Ai Chat
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Sidebar;
