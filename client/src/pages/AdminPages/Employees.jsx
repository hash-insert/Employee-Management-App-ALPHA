import React, { useEffect, useState, useContext } from "react";
import { Avatar, List, message, Tooltip } from "antd";
import axios from "axios";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FormDialog from "../../components/Dialog";
import MuiSnackbar from "../../components/Snackbar";
import NewTeam from "../../components/Modals/NewTeam";
import { Teams } from "../../components/Modals/Teams";
import { EditForm } from "../../components/Modals/EditForm";
import { SnackbarContext } from "../../context/SnackbarContext";
import { RerenderContext } from "../../context/ReRender";
import {
  UserDeleteOutlined,
  EditOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  // eslint-disable-next-line no-unused-vars
  doc,
  // eslint-disable-next-line no-unused-vars
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Search from "antd/es/input/Search";

import "../../App.css";
import Loader from "../../Loader";
import { Api } from "../../Api";
// import DeleteUser from "../../components/Modals/DeleteUser";
// eslint-disable-next-line react/prop-types

const Employees = () => {
  const [open, setOpen] = React.useState(false);
  const { snackbar, handleSnackbarClose } = React.useContext(SnackbarContext);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [newTeamModalVisible, setNewTeamModalVisible] = useState(false);
  // const [deleteModal, setDeleteModal] = useState(false);
  const { render, updateRender } = useContext(RerenderContext);
  const API_URL = "https://server-sx5c.onrender.com";

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleEdit = (values) => {
    setSelectedRow({ ...values });
    setEditFormVisible(true);
  };

  const handleNewTeamButton = (values) => {
    setSelectedRow({ ...values });
    setNewTeamModalVisible(!newTeamModalVisible);
  };

  const handleTeamModal = (user) => {
    setSelectedRow({ ...user });
    setTeamModalVisible(!teamModalVisible);
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setEditFormVisible(false);
  };

  // // eslint-disable-next-line no-unused-vars
  // const handleDeleteModal = () => {
  //   setDeleteModal(!deleteModal);
  // };

  const handleFinish = (values) => {
    try {
      const updatedUsers = users.map((user) => {
        if (user._id === values._id) {
          return { ...user, ...values };
        }
        return user;
      });
      const updatedUser = updatedUsers.find((user) => user._id == values._id);
      editEmployeesData(updatedUser);
      setUsers(updatedUsers);
      setSelectedRow(null);
      setEditFormVisible(false);
      setIsLoading(false);
    } catch (error) {
      console.log("error in editing the details", error);
    }
  };

  const [users, setUsers] = React.useState([]);
  const getAllEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await Api.get(`/employee/getAll`);
      const usersList = response.data.Employee;
      const filteredUsers = usersList.filter(
        (user) =>
          user.employee_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.employee_id.toString().includes(searchQuery)
      );
      setUsers(filteredUsers);
      setIsLoading(false);
    } catch (error) {
      console.log("error in getting all employees", error);
      setIsLoading(false);
    }
  };

  const editEmployeesData = async (user) => {
    try {
      setIsLoading(true);
      const response = await Api.put(`/employee/update/${user._id}`, user);
      if (response.data.success) {
        message.success(
          `${response.data.data.employee_name}'s data is Updated successfully`
        );
        getAllEmployees(); // Refresh the user list after successfully updating
      } else {
        message.error(`Oops! Something went wrong.`);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error in posting employee data", error);
      setIsLoading(false);
    }
  };

  const deleteEmployee = async (user) => {
    try {
      setIsLoading(true);
      // First, delete the user from your own backend (assuming it's served by your server)
      const response = await Api.delete(`/employee/delete/${user._id}`, user);

      if (response.data.success) {
        // Then, delete the user from Firestore
        const collectionRef = collection(db, "users");
        const querySnapshot = await getDocs(
          query(collectionRef, where("email", "==", user.email))
        );
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          message.error(`${user.employee_name} is Deleted successfully`);
        } else {
          message.error(response.data.msg);
        }
        getAllEmployees(); // Refresh the user list after successful deletion
      } else {
        message.error(response.data.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error in deleteing the user", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    getAllEmployees();
    // updateRender();
  }, [render, searchQuery]);

  return (
    <>
      <MuiSnackbar
        open={snackbar.open}
        handleClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity}
      />
      <FormDialog open={open} handleClose={handleClose} />
      <div className=" flex justify-between items-start ">
        <h2 className=" text-xl font-bold text-primary-button">Employees</h2>
        <Tooltip title="Add New Employee">
          <button
            className="bg-primary-button font-medium px-4 py-2 rounded-full text-lg text-text-color inline-block text-white "
            onClick={handleDialogOpen}
          >
            <PersonAddAlt1Icon />
          </button>
        </Tooltip>
      </div>
      <div className=" flex flex-row justify-between py-4 mb-4 items-center">
        <Search
          placeholder="Search employees..."
          allowClear
          onChange={handleSearch}
          style={{
            width: "50%",
          }}
        />
        {/* add a dialog box here with email field and add and cancel buttons  */}
        <Tooltip title="Create Team">
          <button
            className="bg-primary-button font-medium px-4 py-2 rounded-full text-lg text-text-color inline-block text-white "
            onClick={handleNewTeamButton}
          >
            <GroupAddIcon />
          </button>
        </Tooltip>
      </div>

      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <List
          className="demo-loadmore-list"
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              className="border border-black rounded-lg my-2"
              actions={[
                // eslint-disable-next-line react/jsx-key
                <Tooltip title="Edit">
                  <EditOutlined
                    className="button"
                    onClick={() => handleEdit(user)}
                  />
                </Tooltip>,
                // eslint-disable-next-line react/jsx-key
                <Tooltip title="Add to a Team">
                  <UsergroupAddOutlined
                    className="button"
                    onClick={() => handleTeamModal(user)}
                  />
                </Tooltip>,
                // eslint-disable-next-line react/jsx-key
                <Tooltip title="Delete">
                  <UserDeleteOutlined
                    className="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteEmployee(user)}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="mx-2"
                    src={
                      user?.gender == "female"
                        ? "/FemaleAvatar.svg"
                        : "/MaleAvatar.svg"
                    }
                  />
                }
                title={
                  <p>
                    <b>{user.employee_name}</b>
                  </p>
                }
                description={`Employee ID: ${user.employee_id}, Email: ${
                  user.email
                }, Hire Date: ${user.hire_date}, Teams: ${
                  user.teams ? user.teams : ""
                }`}
              />
            </List.Item>
          )}
        />
      )}

      <EditForm
        key={selectedRow?._id}
        visible={editFormVisible}
        onCancel={handleCancel}
        initialValues={selectedRow}
        onFinish={handleFinish}
      />
      <Teams
        id={selectedRow?._id}
        visible={teamModalVisible}
        handleTeamModal={handleTeamModal}
        employeeList={users}
        // teamList={teamList}
      ></Teams>
      <NewTeam
        visible={newTeamModalVisible}
        handleNewTeamButton={handleNewTeamButton}
        values={users}
      ></NewTeam>
      {/* <DeleteUser handleDelete={deleteEmployee} visible={deleteModal} /> */}
    </>
  );
};

export default Employees;
