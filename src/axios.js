import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://mohityadav.codes:4040/"
});

export default axiosInstance;
