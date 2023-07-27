import "./style.css";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="main">
      <img src="./src/assets/error_img.jpg" alt="Error" />
      <NavLink to="/">
        <Button className="btn">Go Back</Button>
      </NavLink>
    </div>
  );
};

export default Error;
