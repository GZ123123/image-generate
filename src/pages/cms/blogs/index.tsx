import { SWRConfig, unstable_serialize } from "swr";
import { ReactElement } from "react";
import { blogAPI } from "src/apis/blog";

import { CCMSLayout } from "src/common/components/layouts";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { BlogListPage } from "src/modules/blog";
import { withAuthSession } from "src/utils/session";

interface IBlogListProps {
  fallback: any;
}

export default function BlogList({ fallback }: IBlogListProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <BlogListPage />
    </SWRConfig>
  );
}

export const getServerSideProps = withAuthSession(async ({ req, res }) => {
  try {
    const blogs = await blogAPI.get(DEFAULT_PAGINATION);

    return {
      props: {
        fallback: {
          [unstable_serialize([
            "blogs",
            DEFAULT_PAGINATION.size,
            DEFAULT_PAGINATION.total,
            "",
          ])]: blogs,
        },
      },
    };
  } catch (e) {
    return { props: { fallback: {} } };
  }
});

BlogList.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
