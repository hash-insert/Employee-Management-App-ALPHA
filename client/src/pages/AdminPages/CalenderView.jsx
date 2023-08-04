import React, { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CalenderPage from "./CalenderPage";
import dayjs from "dayjs";

const CalenderView = () => {
  const finalUser = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [value, setValue] = React.useState(dayjs(new Date()));
  const date = `${value.$d.getFullYear()}-${(value.$d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${value.$d.getDate().toString().padStart(2, "0")}`;

  // navigate to / if user is not logged in

  useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);
  return (
    <>
      <div className=" text-xl font-bold text-primary-button mb-6 flex flex-wrap justify-between items-center">
        <div>CalenderView</div>
        <div>
          <Link to={`/admin/timesheet/${date}`}>View All</Link>
        </div>
      </div>
      <CalenderPage value={value} setValue={setValue} />
    </>
  );
};

export default CalenderView;
