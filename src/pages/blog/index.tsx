import { blogAPIClient } from "src/apis/blog/client";
import { BlogPage } from "src/modules/blog/pages";
import { SWRConfig } from "swr";

interface IBlogProps {
  fallback: any;
}

export default function Blog({ fallback }: IBlogProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <BlogPage />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const blogs = await blogAPIClient.get({ page: 1, pages: 0, size: 10 });

  return { props: { fallback: { blogs: blogs.data } } };
}
