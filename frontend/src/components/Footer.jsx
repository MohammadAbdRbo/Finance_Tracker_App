import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">
          {/* About Us */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>We provide the best solutions to manage your finances easily.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light text-decoration-none" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/project">
                  Our Project
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" className="text-light me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-light">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4">© {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
