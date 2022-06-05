import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<h3>Page Not Found!!!</h3>} />
        <Route
          path="/logout"
          element={
            <>
              <Logout />
            </>
          }
        />
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
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
