import { ReactElement } from "react";
import { bookAPI } from "src/apis";
import { IBookResponse } from 'src/apis/book/types';
import { CCMSLayout } from "src/common/components/layouts";
import { CMS_ROUTES } from "src/common/constants/routes";
import { MBookUpdatePage } from "src/modules/book/pages/update";
import { withAuthSession } from "src/utils/session";

export default function BookUpdate({ id, book }: { id: string, book: IBookResponse }) {
  return (
    <MBookUpdatePage 
      id={id} 
      book={{
        image_id: book.image._id,
        name: book.name,
        description: book.description,
        url: book.url,
        is_pin: book.is_pin,
      }} 
      defaultImageUrl={book.image.url} 
    />
  );
}

BookUpdate.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;

export const getServerSideProps = withAuthSession(async (context: any) => {
  try {
    const res = await bookAPI.getById(context.params.id);

    if (!res?.data?._id) {
      return {
        redirect: {
          destination: CMS_ROUTES.BOOK.INDEX.path,
          permanent: true,
        },
      };
    }

    return {
      props: {
        id: context.params.id,
        book: res.data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: CMS_ROUTES.BOOK.INDEX.path,
        permanent: true,
      },
    };
  }
});
