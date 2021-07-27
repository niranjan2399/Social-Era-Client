import React from "react";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import "./wrapper.scss";
import { Link } from "react-router-dom";

function LoginRegister({ login }) {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="left">
          <h1>SOCIAL ERA</h1>
          <p>Connect with the best people around the World!</p>
        </div>
        <div className="right">
          <div className="tabs">
            <div className="btn-login active">
              <Link to="/Login" className='link'>
              <span>Login</span>
              </Link>
            </div>
            <div className="btn-register">
              <Link to="/register" className='link'>
                <span>Register</span>
              </Link>
            </div>
          </div>
          {login ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
