/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ProfileUpdateDialog from "../ProfileUpdateDialog";
// import { auth } from "../../config/firebase";

// eslint-disable-next-line react/prop-types
const Index = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ProfileUpdateDialog open={open} handleClose={handleClose} data={data} />
      <h1 className="text-2xl font-bold text-primary-button">
        Welcome <span className="capitalize inline">{data?.employee_name}</span>
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={
                data?.gender === "male"
                  ? "/MaleProfile.svg"
                  : "/FemaleProfile.svg"
              }
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <p className="mb-8 leading-relaxed flex items-center">
              <EmailIcon className="mr-2" />
              <span>{data?.email}</span>
            </p>
            <p className="mb-8 leading-relaxed flex items-center">
              <PhoneIcon className="mr-2" />
              <span>{data?.phone_number}</span>
            </p>
            <p className="mb-8 leading-relaxed flex items-center">
              {data?.gender === "male" ? (
                <MaleIcon className="mr-2" />
              ) : (
                <FemaleIcon className="mr-2" />
              )}
              <span>{data?.gender}</span>
            </p>
            <p className="mb-8 leading-relaxed flex items-center">
              <DateRangeIcon className="mr-2" />
              <span>{data?.hire_date}</span>
            </p>
            <p className="mb-8 leading-relaxed flex items-center">
              <CurrencyRupeeIcon className="mr-2" />
              <span>{data?.salary}</span>
            </p>
            <p className="mb-8 leading-relaxed flex items-center">
              <EngineeringIcon className="mr-2" />
              <span>{data?.role}</span>
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleClickOpen}
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
