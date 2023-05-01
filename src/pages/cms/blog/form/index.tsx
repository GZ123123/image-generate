import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";

export default function BlogCreate() {
  return <>Blog Create</>;
}

BlogCreate.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
