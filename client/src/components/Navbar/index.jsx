import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import GoogleIcon from "@mui/icons-material/Google";
import Drawer from "../Drawer/index";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Index() {
  const finalUser = useContext(AuthContext);
  // console.log(finalUser);
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, isLoadingUser] = useAuthState(auth);
  // console.log(auth.currentUser);
  // console.log(`user ${JSON.stringify(user)}`);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrorMessage("Failed to sign in with Google. Please try again.");
      setTimeout(() => setErrorMessage(null), 6000);
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      // console.log(usersList);
      let filteredUser = usersList.filter((u) => u.email === user?.email);
      if (!filteredUser.length) {
        console.log("User not found");
        await signOut(auth);
        setErrorMessage(
          "You don't have permission to access this app. Please contact the administrator."
        );
        setTimeout(() => setErrorMessage(null), 6000);
      } else {
        finalUser.updateUser(filteredUser[0]);
        // console.log(`role ${filteredUser[0].role}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage("Error fetching user data. Please try again later.");
      setTimeout(() => setErrorMessage(null), 6000);
    } finally {
      setLoadingUsers(false);
    }
  };

  React.useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <>
      <nav className="flex flex-row justify-between items-center py-12 mb-8">
        {!finalUser?.user?.email && (
          <Link to="/">
            <div className=" cursor-pointer hidden  sm:block">
              <img
                src={"/logo2.png"}
                alt="logo"
                className="w-32 object-contain"
              />
            </div>
          </Link>
        )}
        <div className="text-text-color">
          {finalUser?.user?.email && isOpen && (
            <MenuOpenIcon
              fontSize="large"
              onClick={toggleDrawer}
              className="cursor-pointer"
            />
          )}
          {finalUser?.user?.email && !isOpen && (
            <MenuIcon
              fontSize="large"
              onClick={toggleDrawer}
              className="cursor-pointer"
            />
          )}
        </div>

        <div>
          {finalUser?.user?.email && (
            <div>
              <Avatar
                src={user.photoURL}
                alt="avatar"
                className="object-contain cursor-auto mb-4"
              />
            </div>
          )}
          {!finalUser?.user?.email && (
            <button
              className="bg-primary-button font-medium px-4 py-2 rounded-md text-lg text-text-color inline-block text-white hover:shadow-primary-button hover:-translate-y-1 transition-shadow"
              onClick={signInWithGoogle}
            >
              <GoogleIcon className="mx-1 inline text-inherit" /> Login
            </button>
          )}
        </div>
      </nav>
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Backdrop open={isLoadingUser || loadingUsers} style={{ zIndex: 9999 }}>
        <CircularProgress className="text-primary-button" />
      </Backdrop>
      {errorMessage && (
        <div className="bg-red-500 text-white py-2 px-4 rounded-md my-4">
          {errorMessage}
        </div>
      )}
    </>
  );
}

export default Index;
