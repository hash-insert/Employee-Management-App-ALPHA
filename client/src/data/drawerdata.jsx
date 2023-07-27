import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DraftsIcon from "@mui/icons-material/Drafts";

const AdminDrawer = [
  {
    name: "Employees",
    path: "/admin/employees",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    name: "TimeSheets",
    path: "/admin/timesheets",
    icon: <ViewTimelineIcon fontSize="small" />,
  },
  {
    name: "CalenderView",
    path: "/admin/calenderview",
    icon: <CalendarMonthIcon fontSize="small" />,
  },
  {
    name: "LeaveRequests",
    path: "/admin/leaverequests",
    icon: <DraftsIcon fontSize="small" />,
  },
];

const EmployeeDrawer = [
  {
    name: "Profile",
    path: "/employee/profile",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    name: "TimeSheets",
    path: "/employee/timesheets",
    icon: <ViewTimelineIcon fontSize="small" />,
  },
  {
    name: "CalenderView",
    path: "/employee/calenderview",
    icon: <CalendarMonthIcon fontSize="small" />,
  },
  {
    name: "LeaveRequests",
    path: "/employee/leaverequests",
    icon: <DraftsIcon fontSize="small" />,
  },
];

export { AdminDrawer, EmployeeDrawer };
