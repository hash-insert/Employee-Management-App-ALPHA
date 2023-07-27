import React from "react";
// import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { SnackbarContext } from "../../context/SnackbarContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { RerenderContext } from "../../context/ReRender";

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
  employeeId: Yup.number().required("Employee ID is required"),
  employeeName: Yup.string().required("Employee name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  hireDate: Yup.date().nullable().required("Hire date is required"),
  salary: Yup.number().required("Salary is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  gender: Yup.string().required("Gender is required"),
});

// eslint-disable-next-line react/prop-types
export default function FormDialog({ open, handleClose }) {
  const { updateRender } = useContext(RerenderContext);
  const usersCollection = collection(db, "users");
  const { handleSnackbarOpen } = React.useContext(SnackbarContext);

  // Formik hook for form state management and validation
  const formik = useFormik({
    initialValues: {
      employeeId: "",
      employeeName: "",
      phone: "",
      hireDate: "",
      salary: "",
      role: "",
      email: "",
      gender: "", // Add a new property for gender
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const querySnapshot = await getDocs(
          query(usersCollection, where("email", "==", values.email))
        );

        if (querySnapshot.empty) {
          await addDoc(usersCollection, {
            employee_id: values.employeeId,
            employee_name: values.employeeName,
            phone_number: values.phone,
            email: values.email,
            hire_date: values.hireDate,
            salary: values.salary,
            role: "employee",
            gender: values.gender, // Save the selected gender
          });

          // Send a request to the server with all form data
          const formData = {
            employee_id: values.employeeId,
            employee_name: values.employeeName,
            phone_number: values.phone,
            email: values.email,
            hire_date: values.hireDate,
            salary: values.salary,
            role: values.role,
            gender: values.gender, // Include gender in the server request
          };

          await fetch("https://server-sx5c.onrender.com/employee/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then((response) => {
            if (!response.ok) {
              throw new Error(
                `Server responded with ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          });

          resetForm();
          handleClose();
          handleSnackbarOpen("Employee added successfully", "success");
          updateRender();
        } else {
          resetForm();
          handleClose();
          handleSnackbarOpen("Employee already exists", "error");
        }
      } catch (error) {
        console.log(error);
        resetForm();
        handleClose();

        handleSnackbarOpen("Failed to add employee", "error");
      }
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter employee details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="employeeId"
            label="Employee ID"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.employeeId && !!formik.errors.employeeId}
            helperText={formik.touched.employeeId && formik.errors.employeeId}
          />
          <TextField
            margin="dense"
            id="employeeName"
            label="Employee Name"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.employeeName && !!formik.errors.employeeName}
            helperText={
              formik.touched.employeeName && formik.errors.employeeName
            }
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            type="tel" // Change type to "tel" for phone number input
            fullWidth
            variant="standard"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            margin="dense"
            id="hireDate"
            label="Hire Date"
            type="date"
            fullWidth
            variant="standard"
            value={formik.values.hireDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hireDate && !!formik.errors.hireDate}
            helperText={formik.touched.hireDate && formik.errors.hireDate}
            InputLabelProps={{ shrink: true }}
            // Add the Box component to style the date input
            style={{ marginTop: "1rem" }}
          />
          <TextField
            margin="dense"
            id="salary"
            label="Salary"
            type="number"
            fullWidth
            variant="standard"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salary && !!formik.errors.salary}
            helperText={formik.touched.salary && formik.errors.salary}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            id="role"
            label="Role"
            type="text" // Use "text" type for a regular text input
            fullWidth
            variant="standard"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && !!formik.errors.role}
            helperText={formik.touched.role && formik.errors.role}
          />
          <FormControl component="fieldset">
            <DialogContentText>Gender</DialogContentText>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-primary-button font-medium px-4 py-2 rounded-md text-lg text-text-color inline-block text-white"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-primary-button font-medium px-4 py-2 rounded-md text-lg text-text-color inline-block text-white"
            onClick={formik.handleSubmit}
          >
            Add
          </button>
          {/* <Button
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Cancel
          </Button> */}
          {/* <Button onClick={formik.handleSubmit}>Add</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
