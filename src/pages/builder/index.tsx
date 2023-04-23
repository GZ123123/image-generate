import { categoryAPIClient } from "src/apis/category/client";
import { imageAPIClient } from "src/apis/image/client";
import { BuilderPage } from "src/modules/builder/pages";
import { IMBuilderPageProps } from "src/modules/builder/types";
import { SWRConfig } from "swr";

export default function Builder({ categories, images }: IMBuilderPageProps) {
  const onSearch = (v: any) => {
    console.log(v);
  };

  return (
    <SWRConfig value={{ fallback: { categories, images } }}>
      <BuilderPage
        categories={categories}
        images={images}
        onSearch={onSearch}
      />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const categories = await categoryAPIClient.get();

  const initCategory = categories.data[0]._id;

  const images = await imageAPIClient.get({ category_id: initCategory });

  return { props: { categories: categories.data, images: images.data } };
}
