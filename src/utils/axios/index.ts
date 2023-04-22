import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => err
);

export default instance;
