import React, { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const loginCall = async (userCredentials, dispatch) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }
    };

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin} className="login_form">
        <input
          type="email"
          id="email"
          ref={email}
          required
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          ref={password}
          required
          minLength="6"
          placeholder="Password"
        />
        <button type="submit" disabled={isFetching}>
          {isFetching ? <CircularProgress size='1rem' /> : 'Login'}
        </button>
      </form>
      {/* <a href="">Forgot Password?</a> */}
      <Link to="/register">
        <button>Create a new Account</button>
      </Link>
    </div>
  );
}

export default Login;
