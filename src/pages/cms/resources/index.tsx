import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export default function ResourcesList() {
  return <>Category</>;
}

ResourcesList.getLayout = (page: ReactElement) => (
  <CCMSLayout>{page}</CCMSLayout>
);
