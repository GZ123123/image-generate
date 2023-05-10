import { ReactElement } from "react";
import { categoryAPI } from "src/apis/category";
import { imageAPI } from "src/apis/image";
import { CCMSLayout } from "src/common/components/layouts";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { ResourcesListPage } from "src/modules/resources";
import { withAuthSession } from "src/utils/session";
import { SWRConfig, unstable_serialize } from "swr";

interface IResourcesListProps {
  fallback: any;
}

export default function ResourcesList({ fallback }: IResourcesListProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <ResourcesListPage />
    </SWRConfig>
  );
}

ResourcesList.getLayout = (page: ReactElement) => (
  <CCMSLayout>{page}</CCMSLayout>
);

export const getServerSideProps = withAuthSession(async (context: any) => {
  const category = await categoryAPI
    .getById(context.params.id)
    .then((res) => res.data);

  const images = await imageAPI.get({
    ...DEFAULT_PAGINATION,
    category_id: category._id,
  });

  return {
    props: {
      fallback: {
        [unstable_serialize(["category", context.params.id])]: category,
        [unstable_serialize([
          "images",
          category._id,
          DEFAULT_PAGINATION.size,
          DEFAULT_PAGINATION.page,
        ])]: images,
      },
    },
  };
});
