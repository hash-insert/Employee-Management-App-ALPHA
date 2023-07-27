import React from "react";

export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
const AuthProviderContext = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const updateUser = (user) => {
    setUser(user);
  };

  const updateToNull = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, updateToNull }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviderContext;
