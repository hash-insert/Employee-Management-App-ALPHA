import axios from "axios";

const Api = axios.create({
  baseURL: "https://employee-0131.onrender.com",
});

export { Api };
