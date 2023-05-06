import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useSession } from "./session.hook";
import { authAPI } from "src/apis";

export const useAuthenticate = () => {
  const { set, clear } = useSession();

  const login = async (username: string, password: string) => {
    const res = await authAPI.login(username, password);

    if (res.errorCode === 0) {
      await set({
        token: res.data.access_token,
        refreshToken: res.data.refresh_token,
      });
    }

    return res;
  };

  const logout = async () => {
    await clear();
  };

  return { login, logout };
};

export const withAuthenticate = <
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    // check token
    if (!context.req.session["token"]) {
      return {
        redirect: {
          destination: "/cms/login",
          permanent: true,
        },
      };
    }

    // get profile

    return handler(context);
  };
};
