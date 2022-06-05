import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
const axios = require("axios");

function Axios() {
  const baseURL = "http://127.0.0.1:8000";

  var access_token = localStorage.getItem("access");
  var refresh_token = localStorage.getItem("refresh");

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(localStorage.getItem("access"));
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    const refreshExpired =
      dayjs.unix(jwt_decode(refresh_token).exp).diff(dayjs()) < 1;

    if (refreshExpired) {
      window.alert("Session Expired, Login Again...");
      window.location.href = "/logout";
    }

    if (!isExpired) return req;

    if (isExpired) {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: localStorage.getItem("refresh"),
      });
      if (response.data) {
        console.log(response);
        localStorage.setItem("access", response.data.access);

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      }
    }
  });

  return axiosInstance;
}

export default Axios;
