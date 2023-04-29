import { categoryAPIClient } from "src/apis/category/client";
import MResourcesPage from "src/modules/resources/pages";
import { SWRConfig } from "swr";

export default function Resources({ categories, fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <MResourcesPage categories={categories} />
    </SWRConfig>
  );
}

export async function getServerSideProps(): Promise<any> {
  const categories = await categoryAPIClient.get();

  return {
    props: {
      categories: categories.data,
      fallback: { categories: categories.data },
    },
  };
}
