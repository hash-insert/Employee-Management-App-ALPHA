// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { List, message } from "antd";
import { Api } from "../../Api";

const LeaveRequest = () => {
  const finalUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);

  // navigate to / if user is not logged in

  useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);

  const getAllLeaves = async () => {
    try {
      const response = await Api.get(`/leaverequest/getAll`);
      const leaveRequests = response.data.leaveRequest;
      const pendingRequests = leaveRequests.filter(
        (l) => l.status === "pending"
      );
      setLeaves(pendingRequests);
    } catch (error) {
      console.log("error in getting the leave requests", error);
    }
  };

  const updateLeave = async (leave, leaveStatus) => {
    try {
      leave.status = leaveStatus;
      const response = await Api.put(
        `/leaverequest/update/${leave._id}`,
        leave
      );
      console.log("leave", leave);
      if (response.data.success) {
        if (leaveStatus === "accepted") {
          message.success(`${leave.employee_name}'s leave ${leaveStatus}`);
          getAllLeaves();
        } else {
          message.error(`${leave.employee_name}'s leave ${leaveStatus}`);
          getAllLeaves();
        }
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      console.log("error in updating the leave status", error);
    }
  };

  useEffect(() => {
    getAllLeaves();
  }, []);
  // Helper function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <h2 className=" text-xl font-semibold mb-4 text-primary-button">
        Leave Requests
      </h2>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={leaves}
        renderItem={(leave) => (
          <List.Item
            className="border border-black rounded-lg my-2 flex flex-wrap"
            actions={[
              // eslint-disable-next-line react/jsx-key
              <button
                className="btn btn-success gy-2"
                onClick={() => {
                  updateLeave(leave, "accepted");
                }}
              >
                Accept
              </button>,
              // eslint-disable-next-line react/jsx-key
              <button
                className="btn btn-danger"
                onClick={() => {
                  updateLeave(leave, "rejected");
                }}
              >
                Reject
              </button>,
            ]}
          >
            <List.Item.Meta
              className="p px-2"
              title={
                <div>
                  <b className=" capitalize text-xl font-semibold">
                    {leave?.employee_name}
                  </b>
                </div>
              }
              description={
                // `Reason: ${leave.reason}, Strat Date: ${leave.start_date}, End Date: ${leave.end_date}`
                <div>
                  <p className=" text-base font-semibold">
                    Reason :{" "}
                    {
                      <div className=" text-base font-medium inline capitalize">
                        {leave?.reason}
                      </div>
                    }
                  </p>
                  <p className="text-sm font-normal">
                    Date: {formatDate(leave?.start_date)} to{" "}
                    {formatDate(leave?.end_date)}
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default LeaveRequest;
