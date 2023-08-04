import { Input, Card, Modal, Tooltip, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RerenderContext } from "../../context/ReRender";
import { Api } from "../../Api";
const NewTeam = ({ visible, handleNewTeamButton, values }) => {
  const [members, setMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const { updateRender } = useContext(RerenderContext);

  const addMember = (member) => {
    const newMember = members.some((m) => m._id === member._id);
    if (!newMember) {
      setMembers([member, ...members]);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setMembers([]);
    handleNewTeamButton();
  };

  const handleOk = async () => {
    await handleAddEmployee();
    form.resetFields();
    setMembers([]);
    handleNewTeamButton();
    updateRender();
  };

  const handleAddEmployee = async () => {
    try {
      if (teamName !== "") {
        const response = await Api.post("/team/createTeam", {
          teamName: teamName,
          members: members.map((mem) => mem._id),
        });
        if (response.data.success) {
          message.success(response.data.msg);
        } else {
          message.error(response.data.msg);
        }
      } else {
        message.error(`Team Name cannot be empty`);
      }
    } catch (error) {
      message.error(`Oops! Something went wrong`);
      console.error("Error sending data to the backend:", error);
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Create A Team"
        open={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          style: { backgroundColor: "blue", borderColor: "blue" },
        }}
      >
        <Form form={form}>
          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[{ required: true, message: "Please enter New team Name" }]}
          >
            <Input
              placeholder="Enter The New Team Name"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Form.Item>
          <div>
            Team Members:{"  "}
            {members.map((mem) => (
              <span key={mem._id}>{mem.employee_name}, </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {values.map((user, index) => (
              <Card
                key={index}
                className="border border-black rounded-lg my-2"
                style={{ width: "150px" }}
                actions={[
                  <Tooltip title="Add to the team">
                    <button
                      className="btn btn-primary py-2 rounded-md text-lg text-text-color inline-flex items-center justify-center text-white"
                      onClick={() => addMember(user)}
                    >
                      <PlusOutlined />
                    </button>
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  title={
                    <p>
                      <b>{user.employee_name}</b>
                    </p>
                  }
                  description={`Role: ${user.role}`}
                />
              </Card>
            ))}
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default NewTeam;
