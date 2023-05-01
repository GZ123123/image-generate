import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export default function Category() {
  return <>Category</>;
}

Category.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
