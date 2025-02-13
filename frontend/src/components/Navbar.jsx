import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // إغلاق القائمة عند النقر على رابط
  const closeNavbar = () => setIsExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          FinAi
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`}>
          {/* Left-aligned links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="#about-us" onClick={closeNavbar}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#our-project" onClick={closeNavbar}>
                Our Project
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact-us" onClick={closeNavbar}>
                Contact Us
              </a>
            </li>
          </ul>

          {/* Right-aligned login/signup buttons */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="btn btn-outline-light rounded-pill mx-2" to="/signin" onClick={closeNavbar}>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-light text-primary rounded-pill mx-2" to="/register" onClick={closeNavbar}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;