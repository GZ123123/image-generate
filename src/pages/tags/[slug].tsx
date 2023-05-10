import { blogAPIClient } from "src/apis/blog/client";
import { MBlogTags } from "src/modules/blog/pages/tags";
import { SWRConfig, unstable_serialize } from "swr";

interface ITagsProps {
  fallback: any;
}

export default function Tags({ fallback }: ITagsProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <MBlogTags />
    </SWRConfig>
  );
}

export async function getServerSideProps(context: any) {
  console.log(context.params.slug);

  const blogs = await blogAPIClient.getByHashtag(context.params.slug, {
    page: 1,
  });

  return {
    props: {
      fallback: {
        [unstable_serialize(["blogs", "tag", context.params.slug, 1, ""])]:
          blogs.data,
      },
    },
  };
}
