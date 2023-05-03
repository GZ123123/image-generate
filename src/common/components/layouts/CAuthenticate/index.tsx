import { useLayoutEffect } from "react";
import { ICAuthenticateProps } from "./types";
import { setToken } from "src/utils/axios";

export const CAuthenticate = ({ children, token }: ICAuthenticateProps) => {
  useLayoutEffect(() => {
    if (token) {
      setToken(token);
    }
  }, []);
  return <>{children}</>;
};
