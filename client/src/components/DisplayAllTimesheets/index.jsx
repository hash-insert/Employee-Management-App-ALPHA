import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DateRange, AvTimer, Task } from "@mui/icons-material";
import AlertDialog from "../MuiDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Backdrop, CircularProgress } from "@mui/material";

const API_URL = "https://server-sx5c.onrender.com";
const getAllTimesheets = async () => {
  try {
    const data = await axios.get(`${API_URL}/timesheet/getAll`);
    return data.data; // Assuming the timesheet data is returned as an array
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch timesheets");
  }
};

const updateTimesheet = async ({ timesheet, status }) => {
  console.log(status);
  try {
    const data = await axios.put(
      `${API_URL}/timesheet/update/${timesheet._id}`,
      {
        project_name: timesheet.project_name,
        status: status,
        activity: timesheet.activity,
        date: timesheet.date,
        duration: timesheet.duration,
      }
    );
    console.log(data.data);
    console.log(data.data.success);
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update timesheet");
  }
};

const Index = () => {
  const { data, isLoading, error } = useQuery("timesheets", getAllTimesheets);
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

  if (isLoading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Time Sheets</h1>
      {data?.Timesheet?.map((timesheet) => {
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

            <div className="flex justify-between mb-4 truncate">
              <h1 className="text-clip overflow-hidden line-clamp-1  text-xl font-semibold capitalize">
                {timesheet.project_name}
              </h1>
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
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-start">
              <div className="flex justify-center items-center">
                <DateRange className="mr-2" />
                <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                  {timesheet.date}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <AvTimer className="mr-2" />
                <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                  {timesheet.duration}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Task className="mr-2" />
                <p className="text-sm font-semibold text-clip overflow-hidden capitalize line-clamp-1">
                  {timesheet.activity}
                </p>
              </div>
              <div
                className="cursor-pointer flex justify-center items-center"
                onClick={() => handleOpen(timesheet._id)}
              >
                <EditIcon className=" mr-2" />
                <p className="text-sm font-semibold text-clip overflow-hidden capitalize line-clamp-1">
                  Edit
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
