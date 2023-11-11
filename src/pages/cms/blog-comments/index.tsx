import { SWRConfig, unstable_serialize } from "swr";
import { ReactElement } from "react";

import { CCMSLayout } from "src/common/components/layouts";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { withAuthSession } from "src/utils/session";
import { blogCommentAPI } from 'src/apis';
import { BlogCommentListPage } from 'src/modules/blog-comment/pages/list';

interface IBlogCommentListProps {
  fallback: any;
}

export default function BlogCommentList({ fallback }: IBlogCommentListProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <BlogCommentListPage />
    </SWRConfig>
  );
}

export const getServerSideProps = withAuthSession(async ({ req, res }) => {
  try {
    const blogComments = await blogCommentAPI.get(DEFAULT_PAGINATION);

    return {
      props: {
        fallback: {
          [unstable_serialize([
            "blog_comments",
            DEFAULT_PAGINATION.size,
            DEFAULT_PAGINATION.total,
            "",
          ])]: blogComments,
        },
      },
    };
  } catch (e) {
    return { props: { fallback: {} } };
  }
});

BlogCommentList.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
