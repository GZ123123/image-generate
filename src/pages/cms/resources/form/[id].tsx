import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export default function ResourcesUpdate() {
  return <>Resources Update</>;
}

ResourcesUpdate.getLayout = (page: ReactElement) => (
  <CCMSLayout>{page}</CCMSLayout>
);
