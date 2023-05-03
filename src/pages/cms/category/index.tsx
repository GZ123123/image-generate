import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { categoryAPI } from "src/apis/category";
import { ICategoryResponse } from "src/apis/category/types";
import { CCMSLayout } from "src/common/components/layouts";
import { CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/CTable/types";
import { CMS_ROUTES } from "src/common/constants/routes";
import useSWR from "swr";

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ICTableColumnsProps<ICategoryResponse>[] => [
  {
    key: "_id",
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
  {
    key: "image",
    label: "image",
    width: "75px",
    render: (value: string, record: ICategoryResponse) => (
      <Image src={value} width={20} height={20} alt={record.name || ""} />
    ),
  },
  { key: "name", label: "name" },
];

export default function Category() {
  const { push } = useRouter();

  const [pagination, setPagination] = useState<ICTablePaginationProps>({
    pages: 0,
    page: 1,
    size: 10,
    total: 0,
  });

  const { data } = useSWR(
    ["categories", pagination.size, pagination.page],
    () => categoryAPI.get(pagination)
  );

  const categories = useMemo(() => {
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
        Categories List
      </Typography>

      <CTable
        name="categories-list"
        data={categories}
        columns={columns({ onEdit, onDelete })}
        pagination={pagination}
        onChange={setPagination}
      />
    </>
  );
}

Category.getLayout = (page: ReactElement) => <CCMSLayout>{page}</CCMSLayout>;