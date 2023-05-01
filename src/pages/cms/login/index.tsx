import { IronSession } from "iron-session";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { MLoginPage } from "src/modules/auth";
import { withSession } from "src/utils/session";

interface ISignInProps {
  session: IronSession;
}

export default function SignIn({ session, ...props }: ISignInProps) {
  const { replace } = useRouter();

  useEffect(() => {
    if (session?.token) {
      replace("/cms");
    }
  }, [session?.token]);

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
    props: { session: req.session, test: "asd" },
  };
});
