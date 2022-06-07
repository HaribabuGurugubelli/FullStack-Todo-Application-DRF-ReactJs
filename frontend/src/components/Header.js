import React, { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";

function Header() {
  let { user } = useContext(AuthContext);
  // const [user, setUser] = useState(() =>
  //   localStorage.getItem("refresh")
  //     ? jwt_decode(localStorage.getItem("access"))
  //     : null
  // );

  console.log(user);

  return (
    <div className="mb-4">
      <nav className="navbar navbar-expand-lg bg-light ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavAltMarkup"
          >
            <div>
              <i className="fa-solid fa-book-open-reader fa-4x"></i>
            </div>
            <div>{user ? <h3>Welcome {user.full_name}</h3> : null}</div>
            <div className="navbar-nav ">
              {user ? (
                <>
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/dashboard"
                  >
                    Dashboard
                  </a>
                  <a className="nav-link" href={`/profile/${user.user_id}`}>
                    Profile
                  </a>
                  <a className="nav-link" href="/logout">
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a className="nav-link" href="/">
                    Login
                  </a>
                  <span style={{ margin: "5px" }}></span>
                  <a className="nav-link" href="/register">
                    SignUp
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
