import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      
      const response = await axios.post('http://localhost:5000/api/users/register', {
        full_name: username,  
        email,
        password,
      });
  
      
      alert(response.data.message);
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
      <Link to="/" className="position-absolute top-0 start-0 m-3 btn btn-primary">
        Home
      </Link>
      <div className="bg-white p-4 rounded shadow w-50 text-center">
        <img src="/logo.png" alt="Logo" className="w-25 mx-auto" />
        <h2 className="fs-3 fw-semibold my-3">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label fw-medium">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-3 text-start">
            <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-100 btn btn-primary">
            Sign Up
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <Link to="/signin" className="text-primary">Sign In Here.</Link>
        </p>
        <p className="mt-3 text-secondary">© 2025</p>
      </div>
    </div>
  );
};

export default SignUp;
