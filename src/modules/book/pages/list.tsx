import useSWR from "swr";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Breadcrumbs,
  Button,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { bookAPI } from "src/apis";

import { CDeleteDialog, CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/types";
import { CMS_ROUTES } from "src/common/constants/routes";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { toast } from "react-toastify";
import { CInput } from "src/common/components/controls";
import { useDebounce } from "src/common/hooks";
import { IBooksResponse } from 'src/apis/book/types';

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ICTableColumnsProps<IBooksResponse>[] => [
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
  { key: "name", label: "title", width: "300px" },
  { 
    key: "image_url", 
    label: "Image", 
    render: (value: string | null) => (
      // eslint-disable-next-line @next/next/no-img-element
      value && <img src={value} alt="Image" className="w-28 h-auto block" />
    ),
  },
  { key: "created_by", label: "created by" },
  { key: "created_date", label: "created date" },
  { key: "modified_by", label: "created by" },
  { key: "modified_date", label: "created date" },
  {
    key: "is_pin",
    label: "Pin?",
    render: (value: boolean) =>
      value && <Chip label="Pin" color="primary" />,
  },
];

export const BookListPage = () => {
  const { push } = useRouter();

  const [q, setQ] = useState("");

  const [pagination, setPagination] =
    useState<ICTablePaginationProps>(DEFAULT_PAGINATION);

  const [deleteData, setDeleteData] = useState<string | null>(null);

  const { data, mutate } = useSWR(
    ["books", pagination.size, pagination.page, q],
    () => bookAPI.get({ ...pagination, q })
  );

  const books = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  const onCreate = () => {
    push({ pathname: CMS_ROUTES.BOOK.CREATE.path });
  };

  const onEdit = (id: string) => {
    push({ pathname: CMS_ROUTES.BOOK.UPDATE.path, query: { id } });
  };

  const onDelete = (id: string) => {
    setDeleteData(id);
  };

  const onOk = async () => {
    if (deleteData) {
      const res = await bookAPI.delete(deleteData);

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

  const onSearch = useDebounce((e: any) => {
    setQ(e.target.value);
    setPagination({ ...pagination, page: 1, pages: 0 });
  }, 400);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography component={"h1"} className="text-xl mb-4">
            Books List
          </Typography>
        </Breadcrumbs>
        <Button variant="contained" onClick={onCreate}>
          Create
        </Button>
      </div>

      <div className="py-4 flex justify-end">
        <Paper>
          <CInput
            onChange={onSearch}
            className="max-w-[250px] px-2 py-1"
            append={<MagnifyingGlassIcon width={20} />}
          />
        </Paper>
      </div>

      <CTable
        name="books-list"
        data={books}
        columns={columns({ onEdit, onDelete })}
        pagination={pagination}
        onChange={setPagination}
      />

      <CDeleteDialog open={!!deleteData} onOk={onOk} onCancel={onCancel} />
    </>
  );
};
