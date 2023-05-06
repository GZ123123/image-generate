import { Breadcrumbs, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { CMS_ROUTES } from "src/common/constants/routes";
import { MBlogForm } from "../components/MBlogForm";
import { useRouter } from "next/router";
import { IBlogRequest } from "src/apis/blog/types";
import { IMBlogUpdatePageProps } from "../type";
import { blogAPI } from "src/apis";

export const MBlogUpdatePage = ({
  id,
  blog,
  initialTags,
}: IMBlogUpdatePageProps) => {
  const { push } = useRouter();

  const onNavigate = (e: any) => {
    e.preventDefault();
    push(CMS_ROUTES.BLOG.INDEX.path);
  };

  const onUpdate = async (data: IBlogRequest) => {
    const res = await blogAPI.update(id, data);

    if (res) {
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
          <Link href={CMS_ROUTES.BLOG.INDEX.path} onClick={onNavigate}>
            {CMS_ROUTES.BLOG.INDEX.title}
          </Link>
          <Typography component={"h1"} className="text-xl">
            {CMS_ROUTES.BLOG.UPDATE.title}
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper className="p-4 flex flex-col gap-y-2">
        <MBlogForm
          edit
          value={blog}
          initialTags={initialTags}
          onSubmit={onUpdate}
          onCancel={onCancel}
        />
      </Paper>
    </>
  );
};
