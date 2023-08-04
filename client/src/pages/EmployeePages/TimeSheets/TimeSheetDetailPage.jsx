// Import statements...

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DateRange, AvTimer, Task } from "@mui/icons-material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EmailIcon from "@mui/icons-material/Email";
import AlertDialog from "../../../components/MuiDialog/index";
// eslint-disable-next-line no-unused-vars
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Tooltip, message } from "antd";
import { auth } from "../../../config/firebase.js";
import Loader from "../../../Loader";

const API_URL = "https://server-sx5c.onrender.com";

const getAllTimesheets = async () => {
  try {
    const data = await axios.get(`${API_URL}/timesheet/getAll`);
    console.log(data.data);
    return data.data; // Assuming the timesheet data is returned as an array
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch timesheets");
  }
};

// eslint-disable-next-line no-unused-vars
const DeleteTimeSheet = async ({ timesheet, status }) => {
  try {
    const data = await axios.delete(
      `${API_URL}/timesheet/delete/${timesheet._id}`
    );
    if (data.data.success) {
      message.success(`${timesheet.name}'s TimeSheet is Deleted successfully`);
    } else {
      message.error("Oops!, something went wrong.");
    }
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update timesheet");
  }
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TimeSheetsTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="timesheets tabs"
        >
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Approved" {...a11yProps(1)} />
          <Tab label="Rejected" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TimeSheetDetailPage status="pending" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TimeSheetDetailPage status="approved" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TimeSheetDetailPage status="rejected" />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// eslint-disable-next-line react/prop-types
const TimeSheetDetailPage = ({ status }) => {
  const { data, isLoading, error } = useQuery("timesheets", getAllTimesheets);
  const queryClient = useQueryClient();
  const mainData =
    data?.Timesheet.filter(
      (item) => item.employee_email === auth.currentUser.email
    ) || [];
  const filteredData = mainData.filter((item) => item.status === status);

  const [openStates, setOpenStates] = useState({}); // Use useState to store open states for each timesheet

  const handleClose = (id) => {
    setOpenStates((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleOpen = (id) => {
    setOpenStates((prevState) => ({ ...prevState, [id]: true }));
  };

  const mutation = useMutation(DeleteTimeSheet, {
    onSuccess: () => {
      return queryClient.invalidateQueries("timesheets");
    },
  });

  if (isLoading) {
    return (
      <>
        <Loader isLoading={isLoading} />
        {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
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
      {/* <button className=" ">
        Back
      </button> */}

      <h1 className="text-xl font-bold text-primary-button mb-6">
        Time Sheets
      </h1>
      {filteredData.map((timesheet) => {
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
                    onClick={() => handleClose(timesheet._id)}
                    className="bg-slate-300 px-4 py-2 rounded-md text-white font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    key="reject"
                    onClick={() => handleSubmit(timesheet, "rejected")}
                    className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold"
                  >
                    Delete
                  </button>
                </>
              }
            />

            <div className="flex justify-between mb-4 truncate">
              <h1 className="text-clip overflow-hidden line-clamp-1  text-xl font-semibold capitalize">
                {timesheet?.employee_name}
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
              <Tooltip title="Email">
                <div className="flex justify-center items-center">
                  <EmailIcon className="mr-2" />
                  <p className="text-sm font-semibold text-ellipsis line-clamp-1">
                    {timesheet.employee_email}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Project">
                <div className="flex justify-center items-center">
                  <AccountTreeIcon className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                    {timesheet.project_name}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Date">
                <div className="flex justify-center items-center">
                  <DateRange className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                    {timesheet.date}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Duration">
                <div className="flex justify-center items-center">
                  <AvTimer className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
                    {timesheet.duration}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Activity">
                <div className="flex justify-center items-center">
                  <Task className="mr-2" />
                  <p className="text-sm font-semibold text-clip overflow-hidden capitalize line-clamp-1">
                    {timesheet.activity}
                  </p>
                </div>
              </Tooltip>
              <Button variant="contained" style={{ backgroundColor: "red" }}>
                <Tooltip title="Edit">
                  <div
                    className="cursor-pointer flex justify-center items-center"
                    onClick={() => handleOpen(timesheet._id)}
                  >
                    <DeleteIcon className=" mr-2" />
                    <p className="text-sm font-semibold text-clip overflow-hidden capitalize line-clamp-1">
                      Delete
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
