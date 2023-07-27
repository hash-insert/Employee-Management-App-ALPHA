import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
const EmpTimeSheets = () => {
  const navigate = useNavigate();
  const finalUser = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);
  return <div>This is timesheets pages</div>;
};

export default EmpTimeSheets;
