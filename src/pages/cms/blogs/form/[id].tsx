import { ReactElement } from "react";
import { blogAPI } from "src/apis";
import { IBlogRequest } from "src/apis/blog/types";
import { IHashtagResponse } from "src/apis/hashtag/types";
import { CCMSLayout } from "src/common/components/layouts";
import { CMS_ROUTES } from "src/common/constants/routes";
import { MBlogUpdatePage } from "src/modules/blog";
import { withAuthSession } from "src/utils/session";

interface IBlogUpdate {
  id: string;

  blog: IBlogRequest;

  initialTags: IHashtagResponse[];
}

export default function BlogUpdate({ id, blog, initialTags }: IBlogUpdate) {
  return <MBlogUpdatePage id={id} blog={blog} initialTags={initialTags} />;
}

BlogUpdate.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;

export const getServerSideProps = withAuthSession(async (context: any) => {
  try {
    const res = await blogAPI.getById(context.params.id);
    if (!res?.data?._id) {
      return {
        redirect: {
          destination: CMS_ROUTES.BLOG.INDEX.path,
          permanent: true,
        },
      };
    }

    const blog: IBlogRequest = {
      ...res.data,
      hashtag_ids: res.data.hashtags?.map(({ _id }) => _id) ?? [],
    };

    const tags = res.data.hashtags ?? [];

    return {
      props: {
        id: context.params.id,
        blog,
        initalTags: tags,
      },
    };
  } catch {
    return {
      redirect: {
        destination: CMS_ROUTES.BLOG.INDEX.path,
        permanent: true,
      },
    };
  }
});
