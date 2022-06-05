import React, { useState } from "react";
import jwt_decode from "jwt-decode";

function Header() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("refresh")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  console.log(user);

  return (
    <div style={{ marginTop: "20px" }}>
      {user ? <h3>Welcome {user.full_name}</h3> : null}

      <div>
        {user ? (
          <a href="/logout">Logout</a>
        ) : (
          <>
            <a href="/">Login</a>
            <span style={{ margin: "5px" }}></span>
            <a href="/register">SignUp</a>
          </>
        )}
      </div>
      <hr></hr>
    </div>
  );
}

export default Header;
