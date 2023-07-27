import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { DateRange, AvTimer, Task } from "@mui/icons-material";

const getTimeSheetDetails = async (id) => {
  try {
    const data = await axios.get(
      `http://localhost:4000/timesheet/getone/${id}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch timesheets");
  }
};
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, error } = useQuery("timesheet", () =>
    getTimeSheetDetails(id)
  );
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <div className="border border-black cursor-pointer rounded py-4 px-6 mb-4 container">
        <div className="flex justify-between mb-4 truncate">
          <h1 className="text-clip overflow-hidden line-clamp-1  text-xl font-semibold capitalize">
            {data?.Timesheet.project_name}
          </h1>
          <p
            className={`border px-2 py-1 text-white font-semibold text-sm rounded-xl lowercase ${
              data?.Timesheet.status === "pending"
                ? "bg-orange-500"
                : data?.Timesheet.status === "approved"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {data?.Timesheet.status}
          </p>
        </div>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-start">
          <div className="flex justify-center items-center">
            <DateRange className="mr-2" />
            <p className="text-sm font-semibold text-clip overflow-hidden line-clamp-1">
              {data?.Timesheet.date}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <AvTimer className="mr-2" />
            <p className="text-sm font-semibold text-clip overflow-hidden  line-clamp-1">
              {data?.Timesheet.duration}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Task className="mr-2" />
            <p className="text-sm font-semibold text-clip overflow-hidden  capitalize line-clamp-1">
              {data?.Timesheet.activity}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
