import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { Api } from "../../Api";

const updateProfile = async ({ id, obj }) => {
  try {
    const response = await Api.put(`/employee/update/${id}`, obj);
    if (response.data.success) {
      message.success(`Your data Updated successfully`);
      return response.data;
    } else {
      message.error(`Oops! Something went wrong.`);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update profile");
  }
};

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function ProfileUpdateDialog({
  // eslint-disable-next-line react/prop-types
  open,
  // eslint-disable-next-line react/prop-types
  handleClose,
  // eslint-disable-next-line react/prop-types
  data,
}) {
  const Schema = yup.object().shape({
    employee_name: yup.string().required("Please enter a Name."),
    phone_number: yup
      .string()
      .required("Please enter a Phone Number.")
      .min(10, "Phone Number must be 10 characters long")
      .max(10, "Phone Number must be 10 characters long"),
  });

  const { register, handleSubmit, formState, setValue, reset } = useForm({
    mode: "onTouched",
    resolver: yupResolver(Schema),
  });

  React.useEffect(() => {
    if (data) {
      // Set the form field values using the latest data when the dialog is opened
      // eslint-disable-next-line react/prop-types
      setValue("employee_name", data?.employee_name || "");
      // eslint-disable-next-line react/prop-types
      setValue("phone_number", data?.phone_number || "");
    }
  }, [data, setValue]);

  const { errors, isSubmitSuccessful, isDirty, isValid, isSubmitting } =
    formState;
  const queryClient = useQueryClient();
  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("profileDetails");
    },
  });

  const onSubmit = (obj) => {
    // eslint-disable-next-line react/prop-types
    try {
      mutation.mutate({ id: data._id, obj });
      handleClose();
      reset();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to submit profile");
    }
  };

  const onError = (errors) => {
    console.log(errors);
    reset();
    handleClose();
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Your Profile</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-2">
            you can update your profile here
          </DialogContentText>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-2"
          >
            <TextField
              {...register("employee_name")}
              label="Name"
              error={!!errors.employee_name}
              helperText={errors.employee_name?.message}
            />
            <TextField
              {...register("phone_number")}
              label="Phone Number"
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />

            <Button
              type="submit"
              variant="contained"
              // style={{ backgroundColor: "#4919f5", color: "white" }}
              disabled={!isDirty || !isValid || isSubmitting}
            >
              Save
            </Button>
            <Button onClick={handleClose} className=" text-primary-button">
              Cancel
            </Button>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
