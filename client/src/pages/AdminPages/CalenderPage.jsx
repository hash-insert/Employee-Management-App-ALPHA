/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

export default function CalenderPage({ value, setValue }) {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  // const [value, setValue] = React.useState(dayjs(new Date()));
  // console.log(value.$d.getDate());
  // console.log(value.$d.getMonth() + 1);
  // console.log(value.$d.getFullYear());

  return (
    <>
      {/* <div>
        <button
          onClick={() => navigate(`/admin/timesheets`)}
          className=" bg-primary-button font-medium px-2 py-2 rounded-md text-base text-text-color inline-block text-white mb-4"
        >
          <KeyboardArrowLeftIcon className="  text-inherit  " />
          Back
        </button>
      </div> */}

      <div className=" flex justify-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DemoItem label="Select Date">
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </>
  );
}
