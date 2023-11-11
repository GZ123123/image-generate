import { SWRConfig, unstable_serialize } from "swr";
import { ReactElement } from "react";

import { CCMSLayout } from "src/common/components/layouts";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { BookListPage } from "src/modules/book/pages/list";
import { withAuthSession } from "src/utils/session";
import { bookAPI } from 'src/apis';

interface IBookListProps {
  fallback: any;
}

export default function BookList({ fallback }: IBookListProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <BookListPage />
    </SWRConfig>
  );
}

export const getServerSideProps = withAuthSession(async ({ req, res }) => {
  try {
    const books = await bookAPI.get(DEFAULT_PAGINATION);

    return {
      props: {
        fallback: {
          [unstable_serialize([
            "books",
            DEFAULT_PAGINATION.size,
            DEFAULT_PAGINATION.total,
            "",
          ])]: books,
        },
      },
    };
  } catch (e) {
    return { props: { fallback: {} } };
  }
});

BookList.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;
