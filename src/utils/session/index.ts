import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import config from "./config";
import { IProfileResponse } from "src/apis/auth/types";

export const withSession = <P extends { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => withIronSessionSsr(handler, config);

export const withSessionApi = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, config);

declare module "iron-session" {
  interface IronSessionData {
    user?: IProfileResponse;

    token?: string;

    refreshToken: string;
  }
}
