import "../style.css";
import React, { useState } from "react";
const axios = require("axios");

function Register() {
  const [data, setData] = useState({
    phone_number: "",
    password: "",
    email: "",
    full_name: "",
    role: "client",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHanler = (e) => {
    e.preventDefault();
    registerRequest();
    console.log(data);
  };

  const registerRequest = () => {
    axios
      .post(`http://127.0.0.1:8000/user_registration/`, { ...data })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/";
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status) {
          alert(`User Allready exists with this Mobile Number or Email Id.`);
        }
      });
  };

  return (
    <div className="container login-wrapper">
      <div className="heading m-2">
        <h3>Signup</h3>
        <hr></hr>
      </div>
      <form id="signupForm" onSubmit={submitHanler}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            name="full_name"
            placeholder="Your Name"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Phone_number" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="Phone_number"
            name="phone_number"
            placeholder="Your Mobile Number"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-lg btn-success mb-3">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Register;
