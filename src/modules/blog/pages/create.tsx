import { Breadcrumbs, Link, Paper, Typography } from "@mui/material";
import { MBlogForm } from "../components/MBlogForm";
import { CMS_ROUTES } from "src/common/constants/routes";
import { useRouter } from "next/router";
import { IBlogRequest } from "src/apis/blog/types";
import { blogAPI } from "src/apis";
import { CLink } from "src/common/components/others";

export const MBlogCreatePage = () => {
  const { push } = useRouter();

  const onCreate = async (data: IBlogRequest) => {
    const res = await blogAPI.create(data);

    if (res.data) {
      setTimeout(() => push(CMS_ROUTES.BLOG.INDEX.path), 300);
      return res;
    } else {
      return res;
    }
  };

  const onCancel = () => {
    push(CMS_ROUTES.BLOG.INDEX.path);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <Breadcrumbs aria-label="breadcrumb">
          <CLink
            href={CMS_ROUTES.BLOG.INDEX.path}
            className="text-blue-500 underline"
          >
            {CMS_ROUTES.BLOG.INDEX.title}
          </CLink>
          <Typography component={"h1"} className="text-xl">
            {CMS_ROUTES.BLOG.CREATE.title}
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper className="p-4 flex flex-col gap-y-2">
        <MBlogForm onSubmit={onCreate} onCancel={onCancel} />
      </Paper>
    </>
  );
};
