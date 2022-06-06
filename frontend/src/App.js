import "./App.css";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import PageNotFound from "./components/errorPage/PageNotFound";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("access")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  const ProtectedRoute = ({ user, redirectPath = "/" }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  const AuthRoute = ({ user, redirectPath = "/dashboard" }) => {
    if (user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Header />
                <PageNotFound />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              <>
                <Logout />
              </>
            }
          />
          <Route element={<AuthRoute user={user} />}>
            <Route
              path="/register"
              element={
                <>
                  <Header />
                  <Register />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Login />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute user={user} />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <Header />
                  <Dashboard />
                </>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
