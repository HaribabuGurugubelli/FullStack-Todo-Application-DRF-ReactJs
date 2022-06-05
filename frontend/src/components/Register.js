import React, { useState } from "react";
const axios = require("axios");

function Register() {
  const [data, setData] = useState({
    phone_number: "",
    password: "",
    email: "",
    full_name: "",
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
      .post(`http://127.0.0.1:8000/user_login/`, { ...data })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

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
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Full Name"
            name="full_name"
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

export default Register;
