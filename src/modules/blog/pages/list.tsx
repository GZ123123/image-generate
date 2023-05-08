import useSWR from "swr";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Breadcrumbs,
  Button,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { blogAPI } from "src/apis/blog";

import { CDeleteDialog, CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/types";
import { CMS_ROUTES } from "src/common/constants/routes";
import { IBlogsReponse } from "src/apis/blog/types";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { toast } from "react-toastify";

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
  {
    key: "is_public",
    label: "public",
    render: (value: boolean) =>
      value && <Chip label="Public" color="primary" />,
  },
  {
    key: "hashtags",
    label: "hashtags",
    width: "400px",
    render: (value: string[]) => (
      <div className="flex gap-x-2">
        {value?.map((v) => (
          <Chip key={v} label={v} size="small" />
        ))}
      </div>
    ),
  },
];

export const BlogListPage = () => {
  const { push } = useRouter();

  const [pagination, setPagination] =
    useState<ICTablePaginationProps>(DEFAULT_PAGINATION);

  const [deleteData, setDeleteData] = useState<string | null>(null);

  const { data, mutate } = useSWR(
    ["blogs", pagination.size, pagination.page],
    () => blogAPI.get(pagination)
  );

  const blogs = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  const onCreate = () => {
    push({ pathname: CMS_ROUTES.BLOG.CREATE.path });
  };

  const onEdit = (id: string) => {
    push({ pathname: CMS_ROUTES.BLOG.UPDATE.path, query: { id } });
  };

  const onDelete = (id: string) => {
    setDeleteData(id);
  };

  const onOk = async () => {
    if (deleteData) {
      const res = await blogAPI.delete(deleteData);

      if (res.errorCode === 0) {
        toast.success("Delete Successfull");
        mutate();
        onCancel();
      } else {
        toast.error("Delete Error");
      }
    }
  };

  const onCancel = () => {
    setDeleteData(null);
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pages: data?.data?.pages || 0,
      total: data?.data?.total || 0,
    });
  }, [data]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography component={"h1"} className="text-xl mb-4">
            Blogs List
          </Typography>
        </Breadcrumbs>
        <Button variant="contained" onClick={onCreate}>
          {" "}
          Create
        </Button>
      </div>

      <CTable
        name="blogs-list"
        data={blogs}
        columns={columns({ onEdit, onDelete })}
        pagination={pagination}
        onChange={setPagination}
      />

      <CDeleteDialog open={!!deleteData} onOk={onOk} onCancel={onCancel} />
    </>
  );
};
