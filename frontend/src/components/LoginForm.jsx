import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log("Server Response:", response);

      if (response.status === 200 && response.data.user) {
        const token = response.data.user.token;

        if (token) {
          console.log("Token received:", token);

          if (rememberMe) {
            // Save token to localStorage if "Remember Me" is checked
            localStorage.setItem("token", token);
            console.log("Token saved to localStorage:", token);
          } else {
            // Save token to sessionStorage if "Remember Me" is not checked
            sessionStorage.setItem("token", token);
            console.log("Token saved to sessionStorage:", token);
          }

          // Navigate to the dashboard
          navigate("/dashboard");
        } else {
          console.error("No token received from server!");
        }
      } else {
        console.error("Login failed with response:", response);
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Link to="/" className="position-absolute top-0 start-0 m-3 btn btn-primary">
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
              onChange={() => setRememberMe(!rememberMe)} // Toggle the state
              className="form-check-input"
            />
            <label htmlFor="rememberMe" className="form-check-label ms-2">Remember me</label>
          </div>
          <button type="submit" className="w-100 btn btn-primary">
            Sign in
          </button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
        <p className="mt-3">
          Don't have an account? <Link to="/signup" className="text-primary">Sign Up Here.</Link>
        </p>
        <p className="mt-3 text-secondary">© 2025</p>
      </div>
    </div>
  );
};

export default SignIn;