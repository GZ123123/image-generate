import { Breadcrumbs, Paper, Typography } from "@mui/material";
import { MBookForm } from "../components/MBookForm";
import { CMS_ROUTES } from "src/common/constants/routes";
import { useRouter } from "next/router";
import { bookAPI } from "src/apis";
import { CLink } from "src/common/components/others";
import { ICreateOrUpdateBookParams } from 'src/apis/book/types';

export const MBookCreatePage = () => {
  const { push } = useRouter();

  const onCreate = async (data: ICreateOrUpdateBookParams) => {
    const res = await bookAPI.create(data);

    if (res.data) {
      setTimeout(() => push(CMS_ROUTES.BOOK.INDEX.path), 300);
      return res;
    } else {
      return res;
    }
  };

  const onCancel = () => {
    push(CMS_ROUTES.BOOK.INDEX.path);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <Breadcrumbs aria-label="breadcrumb">
          <CLink
            href={CMS_ROUTES.BOOK.INDEX.path}
            className="text-blue-500 underline"
          >
            {CMS_ROUTES.BOOK.INDEX.title}
          </CLink>
          <Typography component={"h1"} className="text-xl">
            {CMS_ROUTES.BOOK.CREATE.title}
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper className="p-4 flex flex-col gap-y-2">
        <MBookForm onSubmit={onCreate} onCancel={onCancel} />
      </Paper>
    </>
  );
};
