import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const API_URI = "http://localhost:5000/signUp"
  const formSubmitted = async (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    console.log(data);
    const response = await fetch("api/v1/auth/createUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);

    if (response.status === 201) {
      alert("User Registered Successfully");
      navigate("/signIn");
    }
    if (response.status === 500) {
      alert("Some Internal Server Error");
    }
    if (response.status === 422) {
      alert("Try to register with valid credentails");
    }
  };
  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="signUpForm p-4 p-md-5 border rounded bg-dark text-white container mt-5"
      >
        <div className="form-label">
          <h3>Sign Up Form</h3>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            minLength={2}
            value={name}
            onChange={(event) => {
              event.preventDefault();
              //   console.log(event.target.value);
              setName(event.target.value);
            }}
            placeholder="name"
            required
          />
          <label htmlFor="floatingInput">Enter Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => {
              event.preventDefault();
              //   console.log(event.target.value);
              setEmail(event.target.value);
            }}
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Enter Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            minLength={5}
            value={password}
            onChange={(event) => {
              event.preventDefault();
              //   console.log(event.target.value);
              setPassword(event.target.value);
            }}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <Link to="/signIn">
            <span className="mx-3">Already a User</span>
          </Link>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          //   onClick={formSubmitted}
        >
          Sign up
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignUp;
