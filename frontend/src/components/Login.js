import "../style.css";
import React, { useState, useEffect } from "react";
const axios = require("axios");

function Login() {
  const [data, setData] = useState({
    phone_number: "",
    password: "",
  });

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHanler = (e) => {
    e.preventDefault();
    console.log(data);
    loginRequest();
  };

  const loginRequest = () => {
    axios
      .post(`http://127.0.0.1:8000/user_login/`, { ...data })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          window.location.href = "/dashboard";
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container login-wrapper">
      <div className="">
        <form onSubmit={submitHanler}>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              placeholder="Your Mobile Number"
              name="phone_number"
              onChange={ChangeHandler}
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
              placeholder="************"
              name="password"
              onChange={ChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-lg btn-success mb-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
