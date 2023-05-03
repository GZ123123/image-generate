import { ReactElement } from "react";
import { categoryAPI } from "src/apis/category";
import { CCMSLayout } from "src/common/components/layouts";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { CategoryListPage } from "src/modules/category";
import { withAuthSession } from "src/utils/session";
import { SWRConfig, unstable_serialize } from "swr";

interface ICategoryProps {
  fallback: any;
}

export default function Category({ fallback }: ICategoryProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <CategoryListPage />
    </SWRConfig>
  );
}

Category.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;

export const getServerSideProps = withAuthSession(async () => {
  const categories = await categoryAPI.get(DEFAULT_PAGINATION);

  return {
    props: {
      fallback: {
        [unstable_serialize([
          "categories",
          DEFAULT_PAGINATION.size,
          DEFAULT_PAGINATION.page,
        ])]: categories,
      },
    },
  };
});
