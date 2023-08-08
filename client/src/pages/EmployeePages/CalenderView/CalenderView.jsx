import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CalenderPage from "../../AdminPages/CalenderPage";
import dayjs from "dayjs";
import EastIcon from "@mui/icons-material/East";

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
      <div className=" text-xl font-bold text-primary-button mb-6 flex justify-between items-center">
        <div>
          <h1>
            Calender View for {value.$d.getDate()}/{value.$d.getMonth() + 1}/
            {value.$d.getFullYear()}
          </h1>
        </div>
        <div className=" text-red-500">
          <Link to={`/employee/timesheets/${date}`}>
            View All
            <EastIcon className=" ml-2" />
          </Link>
        </div>
      </div>
      <CalenderPage value={value} setValue={setValue} />
    </>
  );
};

export default EmpCalenderView;
