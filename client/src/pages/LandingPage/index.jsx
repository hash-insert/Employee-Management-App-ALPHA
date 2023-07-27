import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function LandingPage() {
  const finalUser = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (finalUser?.user?.email) {
      if (finalUser?.user?.role === "admin") {
        navigate("/admin/employees");
      } else {
        navigate("/employee/profile");
      }
    }
  }, [finalUser?.user?.email]);

  return (
    <>
      <div className="grid  w-100% tablet:grid-cols-1 grid-cols-2 gap-6 mb-14">
        <div className="w-100% tablet:order-2 flex flex-col justify-evenly space-y-8">
          <div className=" text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-950">
            Employee Management App
          </div>

          <div className="leading-relaxed text-left text-lg text-black/70">
            Our Employee Management App is a powerful tool designed to help you
            streamline and organize your workforce effortlessly. With our
            user-friendly interface and comprehensive features, managing your
            employees has never been easier.
          </div>
        </div>
        <div className="w-full tablet:order-1">
          <img src={"/LandingPage2.svg"} alt="LandingPage" className="w-full" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
