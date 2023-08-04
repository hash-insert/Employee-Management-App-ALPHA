import LeaveRequestsFrorm from "./LeaveRequestsFrorm";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const leaveRequests = () => {
  return (
    <>
      <div className=" flex justify-between items-center text-xl font-bold text-primary-button mb-12 flex-wrap ">
        <div>Leave Requests</div>
        <Link to={"/employee/leaverequestsdetails"} className=" cursor-pointer">
          View All
          <EastIcon className=" ml-2" />
        </Link>
      </div>
      <div className=" grid grid-cols-1 gap-12 md:grid-cols-2 mb-16">
        <div className=" w-full ">
          <img src="/leave2.svg" alt="Leave Svg" className=" w-full" />
        </div>

        <div className=" w-full ">
          <LeaveRequestsFrorm className=" flex " />
        </div>
      </div>
    </>
  );
};

export default leaveRequests;
