import { useEffect, useState } from "react";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }) => {
  // global state
  const [user, setUser] = useState({
    user: {},
    token: "",
  });

  // effect to get the info from the localstorage
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.user) {
      setUser({
        user: authData?.user,
        token: authData?.token,
      });
    }
  }, []);

  const setAuth = (newAuth) => {
    if (!newAuth) return;
    // update the localstorage
    localStorage.setItem("auth", JSON.stringify(newAuth));
    // update the state
    setUser({
      user: newAuth?.user,
      token: newAuth?.token,
    });
  };

  // logout
  const logout = () => {
    localStorage.removeItem("auth");
    setUser({
      user: {},
      token: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: user,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
