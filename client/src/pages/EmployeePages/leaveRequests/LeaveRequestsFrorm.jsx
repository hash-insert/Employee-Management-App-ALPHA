import { useForm } from "react-hook-form";
import { TextField, InputLabel, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { auth } from "../../../config/firebase";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { message } from "antd";

const Schema = yup.object().shape({
  start_date: yup
    .date()
    .required("Please select a Start Date.")
    .test(
      "valid-date",
      "Invalid Date. Please enter a valid date.",
      (value) => value instanceof Date && !isNaN(value)
    ),
  end_date: yup
    .date()
    .required("Please select a End Date.")
    .test(
      "valid-date",
      "Invalid Date. Please enter a valid date.",
      (value) => value instanceof Date && !isNaN(value)
    ),
  reason: yup.string().required("Please enter a Reason."),
});

const sendLeaveRequest = async (data) => {
  try {
    data.status = "pending";
    data.start_date = data.start_date.toISOString().slice(0, 10); // Convert date to ISO format
    data.end_date = data.end_date.toISOString().slice(0, 10); // Convert date to ISO format
    data.employee_email = auth.currentUser.email;
    data.employee_name = auth.currentUser.displayName;
    const res = await axios.post(
      `https://server-sx5c.onrender.com/leaverequest/save`,
      data
    );
    console.log(res.data);
    if (res.data.success) {
      message.success(`Submitted Successfully`);
      return res.data;
    } else {
      message.error(`Oops! Something went wrong`);
    }
  } catch (error) {
    console.log(error);
  }
};

const LeaveRequestsFrorm = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      start_date: new Date(),
      end_date: new Date(),
      reason: "",
    },
    mode: "onTouched",
    resolver: yupResolver(Schema),
  });

  const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitting } =
    formState;
  const queryClient = useQueryClient();
  const mutation = useMutation(sendLeaveRequest);
  const onSubmit = (obj) => {
    mutation.mutate(obj);
    console.log(obj);
    reset();
  };

  const onError = (errors) => {
    console.log(errors);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className=" flex flex-col gap-3"
      >
        <div className=" w-full">
          <InputLabel htmlFor="start_date">Start Date</InputLabel>
          <TextField
            id="start_date"
            // label="Start Date"
            type="date"
            {...register("start_date")}
            error={!!errors.start_date}
            helperText={errors?.start_date?.message}
            fullWidth
          />
        </div>

        <div className=" w-full">
          <InputLabel htmlFor="end_date">End Date</InputLabel>
          <TextField
            id="end_date"
            // label="End Date"
            type="date"
            {...register("end_date")}
            error={!!errors.end_date}
            helperText={errors?.end_date?.message}
            fullWidth
          />
        </div>

        <TextField
          id="reason"
          label="Reason"
          type="text"
          {...register("reason")}
          error={!!errors.reason}
          helperText={errors?.reason?.message}
        />
        <Button
          className=" bg-primary-button text-white"
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LeaveRequestsFrorm;
