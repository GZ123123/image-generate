import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import config from "./config";
import { IProfileResponse } from "src/apis/auth/types";
import { setToken } from "../axios";
import { CMS_ROUTES } from "src/common/constants/routes";

export const withSession = <P extends { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => withIronSessionSsr(handler, config);

export const withAuthSession = <P extends { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) =>
  withIronSessionSsr((context) => {
    if (context.req.session?.token) {
      setToken(context.req.session?.token);
      return handler(context);
    }

    return {
      redirect: {
        destination: CMS_ROUTES.LOGIN.INDEX.path,
        permanent: true,
      },
    };
  }, config);

export const withSessionApi = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, config);

declare module "iron-session" {
  interface IronSessionData {
    user?: IProfileResponse;

    token?: string;

    refreshToken: string;
  }
}
