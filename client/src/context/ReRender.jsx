import React from "react";

export const RerenderContext = React.createContext();

const ReRender = ({ children }) => {
  const [render, setRender] = React.useState(false);

  const updateRender = () => {
    setRender(!render);
  };

  return (
    <RerenderContext.Provider value={{ render, updateRender }}>
      {children}
    </RerenderContext.Provider>
  );
};

export default ReRender;
