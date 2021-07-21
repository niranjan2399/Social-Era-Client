import React from "react";
import Login from "../login/Login";
import Register from "../register/Register";
import "./wrapper.scss";

function LoginRegister({ login }) {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="left">
          <h1>SOCIAL ERA</h1>
          <p>Connect with the best people around the World!</p>
        </div>
        <div className="right">{login ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
}

export default LoginRegister;
