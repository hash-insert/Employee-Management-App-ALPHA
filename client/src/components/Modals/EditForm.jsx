import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Modal, Form, Input } from "antd";

export const EditForm = ({ visible, onCancel, initialValues, onFinish }) => {
  const [form] = Form.useForm();
  const finalUser = useContext(AuthContext);
  const navigate = useNavigate();
  const { Search } = Input;

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish({
          ...initialValues,
          employee_id: values.employee_id,
          employee_name: values.employee_name,
          email: values.email,
          hire_date: values.hire_date,
        });
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  // navigate to / if user is not logged in
  useEffect(() => {
    if (!finalUser?.user?.email) {
      navigate("/");
    }
  }, [finalUser?.user?.email]);

  return (
    <Modal
      title="Edit Form"
      open={visible}
      onCancel={onCancel}
      onOk={handleFinish}
      okButtonProps={{
        style: { backgroundColor: "blue", borderColor: "blue" },
      }}
    >
      <Form form={form} initialValues={initialValues} onFinish={handleFinish}>
        <Form.Item
          name="employee_id"
          label="ID"
          rules={[{ required: true, message: "Please enter ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employee_name"
          label="Name"
          rules={[{ required: true, message: "Please enter Name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter Department ID" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="hire_date"
          label="Hire Date"
          rules={[{ required: true, message: "Please enter Hire Date" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
