import { Input, Card, Modal, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const NewTeam = ({ visible, handleNewTeamButton, values }) => {
  const handleCancel = () => {
    handleNewTeamButton();
  };

  const handleOk = () => {
    handleNewTeamButton();
  };

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
        <Input
          style={{ border: "1px solid black", borderRadius: "10px" }}
          placeholder="Enter The New Team Name"
          rules={[{ required: true, message: "Please enter New team Name" }]}
        />
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
                    onClick={() => handleEdit(user)}
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
      </Modal>
    </>
  );
};
export default NewTeam;
