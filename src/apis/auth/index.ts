import http from "src/utils/axios";

import { ILoginResponse, IProfileResponse, IRefreshResponse } from "./types";
import { IAPIResponse } from "src/common/interfaces";
import axios from "axios";

export const authAPI = {
  login(
    username: string,
    password: string
  ): Promise<IAPIResponse<ILoginResponse>> {
    return http.post("/auth/login", { username, password });
  },

  refresh(token: string): Promise<IAPIResponse<IRefreshResponse>> {
    return http.post("/auth/renew-token", { token });
  },

  profile(token: string): Promise<IAPIResponse<IProfileResponse>> {
    return http.get("/auth/get-profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  logout(): Promise<IAPIResponse<void>> {
    return http.get("/auth/logout");
  },
};
