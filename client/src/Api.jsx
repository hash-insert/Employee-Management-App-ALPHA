import axios from "axios";

const Api = axios.create({
  baseURL: "https://employee-management-app-server.onrender.com",
});

export { Api };
