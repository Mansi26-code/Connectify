import React, { useRef } from "react";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      console.log("User:", {
        username: username.current.value,
        email: email.current.value,
      });
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
            <input placeholder="Password" required ref={password} className="registerInput" type="password" />
            <input placeholder="Confirm Password" required ref={passwordAgain} className="registerInput" type="password" />
            <button className="registerButton" type="submit">Sign Up</button>
            <button className="registerLoginButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
