import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("access") ? localStorage.getItem("access") : null
  );

  let [user, setUser] = useState(() =>
    localStorage.getItem("access")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
