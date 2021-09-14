import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../authContext/AuthContext";

function Register() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    return () => {
      setLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setGender("");
    };
  }, []);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      lastName,
      firstName,
      email,
      password,
      gender,
    };
    try {
      const res = await axios.post("/auth/register", data);
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        history.push(`/user-details/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className="register">
      <form onSubmit={register}>
        <fieldset>
          <input
            type="text"
            id="first_name"
            required
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            id="last_name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </fieldset>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          autoComplete="current-password"
          placeholder="Password"
        />
        <fieldset className="genderWrapper">
          <legend className="legend">Gender</legend>
          <label className="gender">
            <input
              type="radio"
              name="gender"
              id="gender_male"
              required
              onChange={() => setGender("Male")}
              checked={gender === "Male"}
            />
            Male
          </label>
          <label className="gender">
            <input
              type="radio"
              name="gender"
              id="gender_female"
              required
              onChange={() => setGender("Female")}
              checked={gender === "Female"}
            />
            Female
          </label>
        </fieldset>
        <button>
          {loading ? (
            <CircularProgress
              style={{ color: "white", width: "1rem", height: "1rem" }}
            />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}

export default Register;
