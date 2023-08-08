import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DateRange, AvTimer, Task } from "@mui/icons-material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EmailIcon from "@mui/icons-material/Email";
import AlertDialog from "../MuiDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Tooltip, message } from "antd";
import Loader from "../../Loader";
import { Api } from "../../Api";

const API_URL = "https://server-sx5c.onrender.com";
const getAllTimesheets = async () => {
  try {
    const data = await Api.get(`/timesheet/getAll`);
    return data.data; // Assuming the timesheet data is returned as an array
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch timesheets");
  }
};

const updateTimesheet = async ({ timesheet, status }) => {
  try {
    const data = await Api.put(`/timesheet/update/${timesheet._id}`, {
      project_name: timesheet.project_name,
      status: status,
      activity: timesheet.activity,
      date: timesheet.date,
      duration: timesheet.duration,
    });
    if (data.data.success) {
      if (status === "approved") {
        message.success(
          `${timesheet?.employee_name}'s TimeSheet is ${status} succesfully`
        );
      } else {
        message.error(
          `${timesheet?.employee_name}'s TimeSheet is ${status} succesfully`
        );
      }
    } else {
      message.error(`Oops!, something went wrong.`);
    }
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update timesheet");
  }
};

const Index = () => {
  const { data, isLoading, error } = useQuery("timesheets", getAllTimesheets);
  // console.log(data.Timesheet);
  const queryClient = useQueryClient();

  const [openStates, setOpenStates] = useState({}); // Use useState to store open states for each timesheet

  const handleClose = (id) => {
    setOpenStates((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleOpen = (id) => {
    setOpenStates((prevState) => ({ ...prevState, [id]: true }));
  };

  const mutation = useMutation(updateTimesheet, {
    onSuccess: () => {
      return queryClient.invalidateQueries("timesheets");
    },
  });

  const filterData = data?.Timesheet?.filter(
    (timesheet) => timesheet.status === "pending"
  );

  if (isLoading) {
    return (
      <>
        {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <Loader isLoading={isLoading} />
      </>
    );
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  const handleSubmit = async (timesheet, status) => {
    console.log("submit function called");
    try {
      mutation.mutate({ timesheet, status });
      handleClose(timesheet._id); // Close the dialog after the mutation is successful
    } catch (error) {
      console.log(error);
    }
  };

  if (!filterData?.length) {
    return (
      <div className=" flex flex-col gap-12 justify-center items-center ">
        <img src="/empty.svg" alt="empty" className=" max-w-sm" />
        <div className=" text-4xl text-indigo-600 font-extrabold">No data</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {filterData?.map((timesheet) => {
        const isOpen = openStates[timesheet._id] || false; // Retrieve the open state for this timesheet

        return (
          <div
            key={timesheet._id}
            className="border border-black rounded py-4 px-6 mb-4 container"
          >
            <AlertDialog
              title={timesheet.project_name}
              open={isOpen}
              handleClose={() => handleClose(timesheet._id)}
              buttons={
                <>
                  <button
                    key="approve"
                    onClick={() => handleSubmit(timesheet, "approved")}
                    className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold"
                  >
                    Approve
                  </button>
                  <button
                    key="reject"
                    onClick={() => handleSubmit(timesheet, "rejected")}
                    className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold"
                  >
                    Reject
                  </button>
                </>
              }
            />
            <div className=" flex justify-end">
              <p
                className={`border px-2 py-1 text-white font-semibold text-sm rounded-xl lowercase ${
                  timesheet.status === "pending"
                    ? "bg-orange-500"
                    : timesheet.status === "approved"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {timesheet.status}
              </p>
            </div>

            <div className="flex justify-start flex-wrap mb-4 truncate">
              <h1 className="text-clip overflow-hidden line-clamp-1  text-xl font-semibold capitalize flex flex-wrap">
                {timesheet?.employee_name}
              </h1>
            </div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-start">
              <Tooltip title="Email">
                <div className="flex justify-center items-center flex-wrap text-clip overflow-hidden">
                  <EmailIcon className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden ">
                    {timesheet.employee_email}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Project">
                <div className="flex justify-center items-center flex-wrap">
                  <AccountTreeIcon className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                    {timesheet.project_name}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Date">
                <div className="flex justify-center items-center flex-wrap">
                  <DateRange className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                    {timesheet.date}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Duration">
                <div className="flex justify-center items-center flex-wrap">
                  <AvTimer className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                    {timesheet.duration}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Activity">
                <div className="flex justify-center items-center flex-wrap">
                  <Task className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden capitalize line-clamp-1">
                    {timesheet.activity}
                  </p>
                </div>
              </Tooltip>
              {/* make this edit into button and place at the right bottom corner */}
              <Button
                variant="contained"
                style={{ backgroundColor: "#4919f5" }}
              >
                <Tooltip title="Edit">
                  <div
                    className="cursor-pointer flex justify-center items-center"
                    onClick={() => handleOpen(timesheet._id)}
                  >
                    <EditIcon className=" mr-2" />
                    <p className="text-sm font-semibold text-clip overflow-hidden capitalize line-clamp-1">
                      Edit
                    </p>
                  </div>
                </Tooltip>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
