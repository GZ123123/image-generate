import { categoryAPIClient } from "src/apis/category/client";
import { ICategoryResponse } from "src/apis/category/types";
import { imageAPIClient } from "src/apis/image/client";
import { IImageResponse } from "src/apis/image/types";
import { MResourceDetailPage } from "src/modules/resources";
import { SWRConfig } from "swr";

export interface IResourceDetailProps {
  category: ICategoryResponse;

  images: IImageResponse;
}

export default function ResourceDetail({ category, images, fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <MResourceDetailPage category={category} images={images} />
    </SWRConfig>
  );
}

export async function getServerSideProps(context: any): Promise<any> {
  const categories = await categoryAPIClient.get();

  const category = categories.data.find(
    ({ _id }) => context.params.slug === _id
  );

  const images = await imageAPIClient.get({ category_id: category?._id });

  return {
    props: {
      category: category,
      images: images.data || [],
      fallback: {
        categories: categories.data,
        category: category,
        images: images.data || [],
      },
    },
  };
}
