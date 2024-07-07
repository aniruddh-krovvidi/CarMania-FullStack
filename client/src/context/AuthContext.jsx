import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))?.userInfo || null
  );

  const updateUser = (data) => {
    setCurrentUser(data.userInfo);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ userInfo: currentUser }));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
