import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { auth } from "../../../config/firebase";
import { useQuery } from "react-query";
import { useTable } from "react-table";
import Loader from "../../../Loader";
import { Api } from "../../../Api";

const API_URL = "https://server-sx5c.onrender.com";

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

function LeaveRequestsDetailPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading, isError, error } = useQuery(
    "leaveRequests",
    getAllLeaveRequests
  );

  console.log("data", data);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const pendingData = data.filter((item) => item.status === "pending");
  const approvedData = data.filter((item) => item.status === "accepted");
  const rejectedData = data.filter((item) => item.status === "rejected");

  console.log(pendingData);
  console.log("approvedData", approvedData);
  // console.log(approvedData);
  console.log(rejectedData);

  const columns = [
    {
      Header: "Employee Name",
      accessor: "employee_name",
    },
    {
      Header: "Start Date",
      accessor: "start_date",
    },
    {
      Header: "End Date",
      accessor: "end_date",
    },
    {
      Header: "Reason",
      accessor: "reason",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" />
          <Tab label="Approved" />
          <Tab label="Rejected" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          {pendingData.length === 0 ? (
            <div className=" flex flex-col gap-12 justify-center items-center ">
              <img src="/empty.svg" alt="empty" className=" max-w-sm" />
              <div className=" text-4xl text-indigo-600 font-extrabold">
                No data
              </div>
            </div>
          ) : (
            <CustomTable columns={columns} data={pendingData} />
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          {approvedData.length === 0 ? (
            <div className=" flex flex-col gap-12 justify-center items-center ">
              <img src="/empty.svg" alt="empty" className=" max-w-sm" />
              <div className=" text-4xl text-indigo-600 font-extrabold">
                No data
              </div>
            </div>
          ) : (
            <CustomTable columns={columns} data={approvedData} />
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div>
          {rejectedData.length === 0 ? (
            <div className=" flex flex-col gap-12 justify-center items-center ">
              <img src="/empty.svg" alt="empty" className=" max-w-sm" />
              <div className=" text-4xl text-indigo-600 font-extrabold">
                No data
              </div>
            </div>
          ) : (
            <CustomTable columns={columns} data={rejectedData} />
          )}
        </div>
      </CustomTabPanel>
    </Box>
  );
}

async function getAllLeaveRequests() {
  try {
    const response = await Api.get(
      `/leaverequest/getAll/${auth.currentUser.email}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch leave requests");
  }
}

// eslint-disable-next-line react/prop-types
function CustomTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // eslint-disable-next-line react/prop-types
  // if (data.length === 0) {
  //   return <div>No data available.</div>;
  // }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                    background: "#f0f0f0",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestsDetailPage;
