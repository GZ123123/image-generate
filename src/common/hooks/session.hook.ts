import axios from "axios";
import { IronSessionData } from "iron-session";

export const useSession = () => {
  const get = async (key: string) => {
    return axios.get("/api/session/get");
  };

  const set = (data: Partial<IronSessionData>) => {
    // (data: { [key: string]: string }) => {
    return axios.put("/api/session/set", data);
  };

  const clear = () => {
    return axios.put("/api/session/set", null);
  };

  return { get, set, clear };
};
