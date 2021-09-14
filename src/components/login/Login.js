import React, { useContext, useState } from "react";
import "./Login.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

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

    loginCall({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="login_form">
        <div className="form_group">
          <input
            type="text"
            id="text"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Email"
          />
          <FontAwesomeIcon icon={faUser} className="icon" />
        </div>
        <div className="form_group">
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            placeholder="Password"
          />
          <FontAwesomeIcon icon={faLock} className="icon" />
        </div>
        <button type="submit" disabled={isFetching}>
          {isFetching ? (
            <CircularProgress size="1rem" style={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </button>
      </form>
      {/* <a href="">Forgot Password?</a> */}
    </div>
  );
}

export default Login;
