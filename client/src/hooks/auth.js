import { useEffect, useState } from "react";

// use Auth custom hook
const AuthProvider = ({ children }) => {
  // user info state
  const [user, setUser] = useState({
    user: {},
    token: "",
  });
  useEffect(() => {
    const initializeAuth = async () => {};
  }, []);
};
