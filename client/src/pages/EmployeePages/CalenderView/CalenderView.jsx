import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CalenderPage from "../../AdminPages/CalenderPage";
import dayjs from "dayjs";

const EmpCalenderView = () => {
  const [value, setValue] = React.useState(dayjs(new Date()));

  const navigate = useNavigate();
  const finalUser = React.useContext(AuthContext);
  const date = `${value.$d.getFullYear()}-${(value.$d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${value.$d.getDate().toString().padStart(2, "0")}`;

  React.useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);
  return (
    <>
      <div className=" text-2xl font-bold text-primary-button mb-6 flex justify-between items-center">
        <div>This is calender view page</div>

        <div>
          <Link to={`/employee/timesheets/${date}`}>View All</Link>
        </div>
      </div>
      <CalenderPage value={value} setValue={setValue} />
    </>
  );
};

export default EmpCalenderView;
