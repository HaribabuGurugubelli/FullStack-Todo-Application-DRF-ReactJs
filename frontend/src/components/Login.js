import React, { useState, useEffect } from "react";
const axios = require("axios");

function Login() {
  const [data, setData] = useState({
    phone_number: "",
    password: "",
  });

  const changeHandler = (e) => {
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

  useEffect(() => {
    if (localStorage.getItem("refresh")) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div>
      <form onSubmit={submitHanler}>
        <div>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            name="phone_number"
            onChange={changeHandler}
          />
        </div>
        <div>
          <input type="password" name="password" onChange={changeHandler} />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
