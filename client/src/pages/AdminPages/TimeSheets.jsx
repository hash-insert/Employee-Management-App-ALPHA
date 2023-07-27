import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import DisplayAllEmployees from "../../components/DisplayAllEmployees/index";
import DisplayAllTimesheets from "../../components/DisplayAllTimesheets/index";

const TimeSheets = () => {
  const finalUser = useContext(AuthContext);
  const navigate = useNavigate();

  // navigate to / if user is not logged in
  useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);

  return (
    <>
      {/* <DisplayAllEmployees /> */}
      <DisplayAllTimesheets />
    </>
  );
};

export default TimeSheets;
