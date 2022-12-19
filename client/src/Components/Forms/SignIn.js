import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const autoLogoutuser = () => {
    setTimeout(() => {
      console.log("logout");
      localStorage.clear();
      navigate("/");
    }, 3600000);
  };

  const formSubmitted = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    // console.log(data);
    const response = await fetch("api/v1/auth/userLogin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    const { token } = json;
    // console.log(token);

    if (response.status === 201) {
      localStorage.setItem("authToken", token);
      alert("User Logged In Successfully");
      navigate("/dashboard");
      autoLogoutuser();
    }
    if (response.status === 422) {
      alert("Try to login with valid credentails");
    }
    if (response.status === 500) {
      alert("Some Internal Server Error");
    }
    if (response.status === 404) {
      alert("Try to register with valid credentails user not found");
    }
  };
  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="p-4 p-md-5 border rounded-3 bg-dark text-white container mt-5"
      >
        <div className="title form-lable">
          <h3>{props.title}</h3>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
          <Link to="/signUp">
            <span className="mx-3">Not a User</span>
          </Link>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          {props.title}
        </button>
      </form>
    </>
  );
};

SignIn.defaultProps = {
  title: "Sign In",
};

export default SignIn;
