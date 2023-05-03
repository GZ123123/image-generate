import useSWR from "swr";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { blogAPI } from "src/apis/blog";

import { CCMSLayout } from "src/common/components/layouts";
import { CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/CTable/types";
import { CMS_ROUTES } from "src/common/constants/routes";
import { IBlogsReponse } from "src/apis/blog/types";

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ICTableColumnsProps<IBlogsReponse>[] => [
  {
    key: "action",
    label: "action",
    render: (_, record) => (
      <div className="flex justify-start gap-x-2">
        <IconButton color="primary" onClick={() => onEdit(record["_id"])}>
          <PencilSquareIcon width={20} />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(record["_id"])}>
          <TrashIcon width={20} />
        </IconButton>
      </div>
    ),
    sticky: true,
    width: "125px",
  },
  { key: "title", label: "title", width: "500px" },
  { key: "created_by", label: "created by" },
  { key: "created_date", label: "created date" },
  { key: "is_public", label: "public" },
  {
    key: "hashtags",
    label: "hashtags",
    width: "400px",
    render: (value) => (
      <>
        {(value as string[])?.map((v: string) => {
          <span key={v}>{v}</span>;
        })}
      </>
    ),
  },
];

export default function BlogList() {
  const { push } = useRouter();

  const [pagination, setPagination] = useState<ICTablePaginationProps>({
    pages: 0,
    page: 1,
    size: 10,
    total: 0,
  });

  const { data } = useSWR(["blogs", pagination.size, pagination.page], () =>
    blogAPI.get(pagination)
  );

  const blogs = useMemo(() => {
    return data?.data.data ?? [];
  }, [data]);

  const onEdit = (id: string) => {
    push({ pathname: CMS_ROUTES.BLOG.UPDATE.path, query: { id } });
  };

  const onDelete = (id: string) => {
    // console.log(id);
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pages: data?.data.pages || 0,
      total: data?.data.total || 0,
    });
  }, [data]);

  return (
    <>
      <Typography component={"h1"} className="text-xl mb-4">
        Blogs List
      </Typography>

      <CTable
        name="blogs-list"
        data={blogs}
        columns={columns({ onEdit, onDelete })}
        pagination={pagination}
        onChange={setPagination}
      />
    </>
  );
}

BlogList.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;