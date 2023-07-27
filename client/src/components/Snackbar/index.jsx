import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// eslint-disable-next-line react/prop-types
const MuiSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MuiSnackbar;
