import axios from "axios";
import { useQuery } from "react-query";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { Api } from "../../Api";

const getAllEmployees = async () => {
  try {
    const data = await Api.get(`/employee/getAll`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch employees");
  }
};

const EmployeeList = () => {
  const { data, isLoading, error } = useQuery("employees", getAllEmployees);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <h1 className="mb-5 text-xl font-semibold">Employees</h1>
      {data.Employee.map((employee) => (
        <Link
          to={`/admin/timesheets/${employee._id}`}
          key={employee._id}
          className="flex items-center mb-3 rounded border border-black hover:border-indigo-600 hover:border-2 hover:cursor-pointer py-3 px-6"
        >
          <AccountCircleIcon className="text-indigo-600 mr-3" />
          <h1 className="text-lg font-semibold capitalize line-clamp-1">
            {employee.employee_name}
          </h1>
        </Link>
      ))}
    </>
  );
};

export default EmployeeList;
