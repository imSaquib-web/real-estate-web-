import { useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedToken ? jwtDecode(storedToken) : null);
  //If token exists → decode it → get user info

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(jwtDecode(token));
    // Initial decode = page load 
    // This decode = login moment
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
