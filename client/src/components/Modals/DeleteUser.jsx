import { Modal } from "antd";
import React from "react";

const DeleteUser = ({ visible }) => {
  return (
    <Modal open={visible}>
      <h2>
        Are you sure to delete the employee wiht Name: ${user.employee_name}
      </h2>
    </Modal>
  );
};

export default DeleteUser;
