import { Button, TextField, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { auth } from "../../../config/firebase";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { message } from "antd";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const Schema = yup.object().shape({
  project_name: yup.string().required("Please enter a Project Name."),
  activity: yup.string().required("Please enter an Activity."),
  date: yup
    .date("Must be a Date type")
    .required("Please select a Date.")
    .test(
      "valid-date",
      "Invalid Date. Please enter a valid date.",
      (value) => value instanceof Date && !isNaN(value)
    ),
  duration: yup
    .number()
    .required("Please enter the Duration.")
    .min(1, "Duration must be at least 1.")
    .max(24, "Duration cannot be more than 24."),
});

const API_URL = "https://server-sx5c.onrender.com";

const sendTimeSheet = async (data) => {
  try {
    // Extract year, month, and day components from the provided date string
    const dateObj = new Date(data.date);
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1; // Months are 0-indexed, so adding 1 to get the correct month
    let day = dateObj.getDate();

    // Convert month and day to two-digit format if they are single digits
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    // Construct the date in "yyyy-mm-dd" format
    data.date = `${year}-${month}-${day}`;
    data.duration = data.duration.toString() + "hrs"; // Convert duration to string
    console.log(data);
    const response = await axios.post(`${API_URL}/timesheet/save`, {
      project_name: data.project_name,
      activity: data.activity,
      date: data.date,
      duration: data.duration,
      status: "pending",
      employee_email: auth.currentUser.email,
      employee_name: auth.currentUser.displayName,
    });
    if (response.data.success) {
      message.success(`Your Timesheet is Submitted successfully`);
      console.log(response.data);
      return response.data;
    } else {
      message.error(`Oops! Something went wrong`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error("Failed to submit timesheet");
  }
};

const TimeSheets = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      project_name: "",
      activity: "",
      date: new Date(),
      duration: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(Schema),
  });

  const { isSubmitSuccessful, isDirty, isValid, isSubmitting } = formState;

  const queryClient = useQueryClient();
  const mutation = useMutation(sendTimeSheet, {
    onSuccess: () => {
      return queryClient.invalidateQueries("timesheets");
    },
  });

  const onSubmit = (data) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <div className=" flex justify-between items-center flex-wrap mb-6 text-xl text-primary-button font-bold">
        <h1>Submit TimeSheets</h1>

        <Link to={"/employee/timesheetsdetails"} className=" cursor-pointer">
          View All
          <EastIcon className=" ml-2" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* SVG section */}
        <div className="w-full md:order-2">
          <img src="/time.svg" alt="time" className="w-full items-center" />
        </div>

        {/* Form section */}
        <div className="w-full md:order-1 mt-6">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4"
          >
            <TextField
              type="text"
              label="Project Name"
              {...register("project_name")}
              error={!!formState.errors.project_name}
              helperText={formState.errors.project_name?.message}
            />
            <TextField
              type="text"
              label="Activity"
              {...register("activity")}
              error={!!formState.errors.activity}
              helperText={formState.errors.activity?.message}
            />
            <InputLabel htmlFor="date" className=" m-0"></InputLabel>
            <TextField
              type="date"
              id="date"
              label="Date"
              {...register("date")}
              defaultValue={new Date().toISOString().slice(0, 10)} // Set default value to today's date
              error={!!formState.errors.date}
              helperText={formState.errors.date?.message}
              InputLabelProps={{ shrink: true }} // Ensure the label is not floating on top of the input
            />
            <TextField
              type="number"
              label="Number of Hours worked?"
              error={!!formState.errors.duration}
              helperText={formState.errors.duration?.message}
              {...register("duration")}
            />
            <Button
              type="submit"
              variant="contained"
              // style={{ backgroundColor: "#4919f5", color: "white" }}
              disabled={!isDirty || !isValid || isSubmitting}
            >
              Submit
            </Button>
            {/* ... rest of the form content */}
          </form>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <h1 className=" mb-4 text-xl font-semibold">Submit TimeSheets</h1>
  //     <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
  //       <div>
  //         <form
  //           onSubmit={handleSubmit(onSubmit, onError)}
  //           className=" flex flex-col gap-4 order-2 md:order-1 "
  //         >
  //           <TextField
  //             type="text"
  //             label="Project Name"
  //             {...register("project_name")}
  //             error={!!formState.errors.project_name}
  //             helperText={formState.errors.project_name?.message}
  //           />
  //           <TextField
  //             type="text"
  //             label="Activity"
  //             {...register("activity")}
  //             error={!!formState.errors.activity}
  //             helperText={formState.errors.activity?.message}
  //           />
  //           <TextField
  //             type="date"
  //             label="Date"
  //             {...register("date")}
  //             error={!!formState.errors.date}
  //             helperText={formState.errors.date?.message}
  //           />
  //           <TextField
  //             type="number"
  //             label="Number of Hours worked?"
  //             error={!!formState.errors.duration}
  //             helperText={formState.errors.duration?.message}
  //             {...register("duration")}
  //           />
  //           <Button
  //             type="submit"
  //             variant="outlined"
  //             disabled={!isDirty || !isValid || isSubmitting}
  //           >
  //             Submit
  //           </Button>
  //         </form>
  //       </div>
  //       <div className=" w-full items-center order-1 md:order-2">
  //         <img src="/time.svg" alt="time" className=" w-full items-center" />
  //       </div>
  //     </div>
  //   </>
  // );
};

export default TimeSheets;
