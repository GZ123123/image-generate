import { blogAPIClient } from "src/apis/blog/client";
import { IBlogResponse, IPublicBlogsResponse } from "src/apis/blog/types";
import { IPagination } from "src/common/interfaces";
import { BlogPage } from "src/modules/blog/pages";

export default function Blog({
  data,
}: {
  data: IPagination<IPublicBlogsResponse>;
}) {
  return <BlogPage blogs={data.data} />;
}

export async function getServerSideProps() {
  const blogs = await blogAPIClient.get({ page: 1, pages: 0, size: 20 });

  return { props: { data: blogs.data } };
}
