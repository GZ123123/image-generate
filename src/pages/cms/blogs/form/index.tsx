import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";
import { MBlogCreatePage } from "src/modules/blog";

export default function BlogCreate() {
  return <MBlogCreatePage />;
}

BlogCreate.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
