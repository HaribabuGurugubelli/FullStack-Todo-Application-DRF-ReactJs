import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import AllTodos from "./AllTodos";

function Dashboard() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("refresh")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  return (
    <div className="container">
      <div>
        <AllTodos />
      </div>
    </div>
  );
}

export default Dashboard;
