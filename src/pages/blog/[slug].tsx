import { blogAPIClient } from "src/apis/blog/client";
import { IPublicBlogResponse } from "src/apis/blog/types";
import { MBlogDetail } from "src/modules/blog/pages/detail";

interface IBlogBySlugProps {
  data: IPublicBlogResponse;
}

export default function BlogBySlug({ data }: IBlogBySlugProps) {
  return <MBlogDetail blog={data} />;
}

export async function getServerSideProps(context: any) {
  const blog = await blogAPIClient.getBySlug(context.params.slug);

  return { props: { data: blog.data } };
}
