import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export default function BlogUpdate() {
  return <>Blog Update</>;
}

BlogUpdate.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
