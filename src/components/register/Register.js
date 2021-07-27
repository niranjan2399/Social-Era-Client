import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";
import axios from "axios";

function Register() {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const [gender, setGender] = useState("");
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const data = {
      lastName: lastName.current.value,
      firstName: firstName.current.value,
      email: email.current.value,
      password: password.current.value,
      gender: gender,
    };
    try {
      const res = await axios.post("/auth/register", data);
      if (res.status === 200) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={register}>
        <fieldset>
          <input
            type="text"
            id="first_name"
            required
            ref={firstName}
            placeholder="First Name"
          />
          <input
            type="text"
            id="last_name"
            required
            ref={lastName}
            placeholder="Last Name"
          />
        </fieldset>
        <input
          type="email"
          id="email"
          required
          ref={email}
          autoComplete="email"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          required
          ref={password}
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
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
