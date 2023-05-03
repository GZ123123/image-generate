import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts/CCMSLayout";
import { withAuthenticate } from "src/common/hooks/authenticate.hook";
import { withSession } from "src/utils/session";

export default function CMS() {
  return (
    <div>
      <button onClick={() => {}}>Login</button>
    </div>
  );
}

CMS.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;

export const getServerSideProps = withSession(
  withAuthenticate(({ req, res }) => {
    return {
      props: {},
    };
  })
);
