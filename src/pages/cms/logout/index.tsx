import { CMS_ROUTES } from "src/common/constants/routes";
import { withAuthSession } from "src/utils/session";

export default function Logout() {
  return <>Logout</>;
}

export const getServerSideProps = withAuthSession(async (context: any) => {
  await context.req.session.destroy();

  return {
    redirect: {
      destination: CMS_ROUTES.LOGIN.INDEX.path,
      permanent: true,
    },
  };
});
