import React from "react";

export const SnackbarContext = React.createContext();
// eslint-disable-next-line react/prop-types
const SnackbarContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleSnackbarOpen = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <SnackbarContext.Provider
      value={{ snackbar, handleSnackbarClose, handleSnackbarOpen }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
