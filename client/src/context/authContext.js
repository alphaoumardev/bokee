import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) =>
{
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (input) =>
  {
    const res = await axios.post("/auth/login", input);
    setCurrentUser(res.data);
    console.log(res.data)
    return res;
  };

  const logout = async () => {
    const res = await axios.post("/auth/logout");
    setCurrentUser(null);
    return res;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
