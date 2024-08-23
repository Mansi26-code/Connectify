import { useRef } from "react";
import "./login.css";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() { 
  const email = useRef();
  const password = useRef();
  const isFetching = false; // Dummy state for fetching

  const handleClick = (e) => {
    e.preventDefault();
    // Placeholder logic for button click
    console.log("Login attempted with:", email.current.value, password.current.value);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img src="/assets/logo.png" alt="Connectify Logo" className="loginLogoImage" />
          <h3 className="loginLogo typing">Connectify</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Connectify.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="loginInput" ref={email} />
            <input placeholder="Password" className="loginInput" required minLength="6" type="password" ref={password} />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a new Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
