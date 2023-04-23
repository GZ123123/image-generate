import { signIn } from "next-auth/react";
import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts/CCMSLayout";

export default function CMS() {
  return (
    <>
      <div>
        <button onClick={() => signIn()}>Login</button>
      </div>
    </>
  );
}

CMS.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
