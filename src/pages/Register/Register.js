import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

function Register() {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const cfPassword = useRef();

  function register(e) {
    e.preventDefault();
		console.log(firstName.current.value, lastName.current.value)
  }
  return (
    <div className="register">
      <form onSubmit={register}>
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
        <input
          type="email"
          id="email"
          required
          ref={email}
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          required
          ref={password}
					minLength='6'
          placeholder="Password"
        />
        <input
          type="password"
          id="confirm_password"
          required
          placeholder="Confirm Password"
					minLength='6'
          ref={cfPassword}
        />
        <div className="genderWrapper">
          <span>Gender</span>
          <div className="gender">
            <input
              type="radio"
              name="gender"
              id="gender_male"
              required
              value="male"
            />
            <span>Male</span>
          </div>
          <div className="gender">
            <input
              type="radio"
              name="gender"
              id="gender_female"
              required
              value="female"
            />
            <span>Female</span>
          </div>
        </div>
        <button>Register</button>
        <Link className="loginLink" to="/login">
          Already a user?
        </Link>
      </form>
    </div>
  );
}

export default Register;
