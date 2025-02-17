import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // إضافة useNavigate هنا
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // إضافة حالة rememberMe
  const [error, setError] = useState(""); // لإظهار الرسائل عند حدوث خطأ
  const navigate = useNavigate(); // إضافة useNavigate هنا

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
    
      const token = response.data.user.token;

      if (token) {
        if (rememberMe) {
          localStorage.setItem("token", token);
          console.log("Token saved to localStorage:", token);
        } else {
          sessionStorage.setItem("token", token);
          console.log("Token saved to sessionStorage:", token);
        }
        
        navigate("/dashboard"); // التوجيه للوحة التحكم
      } else {
        console.error("No token received from server!");
      }
      
      
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred, please try again.");
      }
    }
    
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Link  className="position-absolute top-0 start-0 m-3 btn btn-primary">
        Home
      </Link>
      <div className="bg-white p-4 rounded shadow w-50 text-center">
        <img src="/logo.png" alt="Logo" className="w-25 mx-auto" />
        <h2 className="fs-3 fw-semibold my-3">Please Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label fw-medium">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label fw-medium">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check text-start mb-3">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="form-check-input"
            />
            <label htmlFor="rememberMe" className="form-check-label ms-2">Remember me</label>
          </div>
          <button type="submit" className="w-100 btn btn-primary">
            Sign in
          </button>
        </form>
        <p className="mt-3">
          Don't have an account? <Link to="/signup" className="text-primary">Sign Up Here.</Link>
        </p>
        <p className="mt-3 text-secondary">© 2025</p>
      </div>
    </div>
  );
};

export default SignIn;
