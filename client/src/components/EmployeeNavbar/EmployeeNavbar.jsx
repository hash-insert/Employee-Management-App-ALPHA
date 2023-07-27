import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useHistory } from 'react-router-dom';
import Drawer from "../Drawer/index";
import Button from "../Button/index";

function Index() {
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleListItemClick = (path) => {
    setIsOpen(false);
    history.push(path);
  }

  return (
    <>
      <nav className="flex flex-row justify-between py-12 mb-8">
        <div className="text-text-color">
          {isOpen ? (
            <MenuOpenIcon
              fontSize="large"
              onClick={toggleDrawer}
              className="cursor-pointer"
            />
          ) : (
            <MenuIcon
              fontSize="large"
              onClick={toggleDrawer}
              className="cursor-pointer"
            />
          )}
        </div>

        <div>
          <Button content="Profile" />
        </div>
      </nav>
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} handleListItemClick = {handleListItemClick} />
    </>
  );
}

export default Index;