const express = require("express");
const cors = require("cors");
const app = express();
const { default: mongoose } = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://employee-management-app-je5w.onrender.com",
    ],
    credentials: true,
  })
);
const postionRoute = require("./routes/posi_route");
app.use("/position/", postionRoute);

const departmentRoute = require("./routes/departmentRoute");
app.use("/department/", departmentRoute);

const employeeRoute = require("./routes/employeeRoute");
app.use("/employee/", employeeRoute);

const leaveRequestRoute = require("./routes/leaveRequestRoute");
app.use("/leaverequest/", leaveRequestRoute);

const timesheetRoute = require("./routes/timesheetRoute");
app.use("/timesheet/", timesheetRoute);

app.get("/", (req, res) => {
  return res.json("hi there");
});

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => console.log(error));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
