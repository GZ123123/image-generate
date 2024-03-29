import axios from "axios";
import { IronSessionData } from "iron-session";

export const useSession = () => {
  const get = async (key: string) => {
    const res = await axios.get("/api/session/get", {
      withCredentials: true,
    });
    return <IronSessionData>res.data;
  };

  const set = (data: Partial<IronSessionData>) => {
    return axios.put("/api/session/set", data, {
      withCredentials: true,
    });
  };

  const clear = () => {
    return axios.put("/api/session/set", null);
  };

  return { get, set, clear };
};
