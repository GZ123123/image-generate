import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export function BlogList() {
  return <>Blog List</>;
}

BlogList.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
