import { IronSession } from "iron-session";
import { ReactElement } from "react";
import { MLoginPage } from "src/modules/auth";
import { withSession } from "src/utils/session";

interface ISignInProps {
  session: IronSession;
}

export default function SignIn({ session, ...props }: ISignInProps) {
  return <MLoginPage />;
}

SignIn.getLayout = (page: ReactElement) => <>{page}</>;

export const getServerSideProps = withSession(({ req, res }) => {
  if (req.session.token) {
    return {
      redirect: {
        destination: "/cms",
        permanent: true,
      },
    };
  }

  return {
    props: { session: req.session },
  };
});
