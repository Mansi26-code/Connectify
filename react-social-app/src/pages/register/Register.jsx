import React, { useRef, useState } from "react"; // Import useState for error messages
import "./register.css";
import axios from "axios";  // Import axios
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const navigate = useNavigate();  // Use useNavigate

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Check if passwords match
    if (passwordAgain.current.value !== password.current.value) {
      setErrorMessage("Passwords don't match");
      return; // Stop further execution
    }

    // Check if password length is valid
    if (password.current.value.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return; // Stop further execution
    }

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      // Send POST request to backend for registration
      await axios.post("http://localhost:8800/api/auth/register", user);
      
      // Navigate to login page on successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage("Registration failed. Please try again."); // Set error message
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <img src="/assets/logo.png" alt="Connectify Logo" className="registerLogoImage" />
          <h3 className="registerLogo typing">Connectify</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Connectify.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="registerInput" />
            <input placeholder="Email" required ref={email} className="registerInput" type="email" />
            <input 
              placeholder="Password" 
              required 
              ref={password} 
              className="registerInput" 
              type="password" 
              minLength={6} 
            />
            <input 
              placeholder="Confirm Password" 
              required 
              ref={passwordAgain} 
              className="registerInput" 
              type="password" 
            />
            {errorMessage && <div className="errorMessage">{errorMessage}</div>} {/* Display error message */}
            <button className="registerButton" type="submit">Sign Up</button>
            <button className="registerLoginButton" type="button" onClick={() => navigate("/login")}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
