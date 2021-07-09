import React from "react";
import { Link } from "react-router-dom";
import "./login.scss";

function Login() {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="login_form">
        <input type="text" name="" id="" placeholder="Email" />
        <input type="password" name="" id="" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <a href="">Forgot Password?</a>
      <Link to="/register">
        <button>Create a new Account</button>
      </Link>
    </>
  );
}

export default Login;
