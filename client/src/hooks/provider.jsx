import { useEffect, useState } from "react";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }) => {
  // global state
  const [user, setUser] = useState(null);
  // effect to get the info from the localstorage
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.user) {
      setUser(authData?.user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth: user }}>
      {children}
    </AuthContext.Provider>
  );
};
