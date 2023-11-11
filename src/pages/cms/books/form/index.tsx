import { ReactElement } from "react";
import { CCMSLayout } from "src/common/components/layouts";
import { MBookCreatePage } from 'src/modules/book/pages/create';

export default function BookCreate() {
  return <MBookCreatePage />;
}

BookCreate.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
