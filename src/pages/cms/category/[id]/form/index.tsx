import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export default function ResourcesCreate() {
  return <>Resources Create</>;
}

ResourcesCreate.getLayout = (page: ReactElement) => (
  <CCMSLayout>{page}</CCMSLayout>
);
