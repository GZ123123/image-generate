import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => err
);

export const setToken = (token: string) => {
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export default instance;
