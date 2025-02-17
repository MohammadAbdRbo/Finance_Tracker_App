import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome icon for profile

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" className="p-3">
            <Navbar.Brand href="#">Finance Dashboard</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="#profile" className="text-white">
                    <FaUserCircle size={24} className="mr-2" /> Profile
                </Nav.Link>
                <Nav.Link href="#logout" className="text-white">Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;
