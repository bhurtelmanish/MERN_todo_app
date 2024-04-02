import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import FloatingShapes from "../components/FloatingShapes";

import img2 from '../images/img2.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    //Clear old token when login is successful
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    const response = await fetch(`https://mern-todo-app-delta-sable.vercel.app/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data.token , data.userId);

    //Show the alert menu based on given conditions and params
    const alertState = (state, message, className) => {
      setShowAlert(state);
      setAlertMessage(message);
      setAlertClass(className);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    };

    if (data.status == 400) {
      alertState(true, "Password is incorrect", "danger-alert alert");
    } else if (data.status == 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId" , data.userId);
      alertState(true, "Email and Password are correct", "success-alert alert");
      setTimeout(() => navigate("/"), 1000);
    } else if (data.status == 411) {
      alertState(true, "Cannot find user with such email", "danger-alert alert");
    }
  };

  return (
    <>
      <div className="auth-page">
        <img src={img2} className="register-image" />
        {showAlert && (<Alert alertMessage={alertMessage} alertType={alertClass} />)}

          <form onSubmit={loginSubmit} method="POST" className="form register-form">
            <header>Login</header>

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="email input"
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="password input"
              placeholder="Enter your password"
              required
            />

            <input type="submit" value="Login" className="form-submit" />

            <div className="form-division">or</div>

            {/* <button className="google-auth-button">
              <div className="google-icon-container">
                <img
                  src="../../src/images/google.png"
                  className="google-icon"
                />
              </div>
              Continue with Google
            </button> */}

            <span className="form-msg">
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </span>
          </form>

        <FloatingShapes />
      </div>
    </>
  );
};

export default Login;
