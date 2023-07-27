import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const EmpCalenderView = () => {
  const navigate = useNavigate();
  const finalUser = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);
  return <div>this is calender view pages</div>;
};

export default EmpCalenderView;
