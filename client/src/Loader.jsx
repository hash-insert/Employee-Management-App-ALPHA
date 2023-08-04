import { SyncLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const Loader = ({ isLoading }) => {
  return (
    <div className=" flex justify-center items-center">
      <SyncLoader color={"#4919f5"} loading={isLoading} size={15} />
    </div>
  );
};

export default Loader;
