import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Breadcrumbs, Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { categoryAPI } from "src/apis/category";
import { ICategoryRequest, ICategoryResponse } from "src/apis/category/types";
import { CDeleteDialog, CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/types";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { CMS_ROUTES } from "src/common/constants/routes";
import useSWR from "swr";
import { MForm } from "../../components/MForm";
import { ICategoryForm } from "../../components/MForm/types";
import { imageAPIClient } from "src/apis/image/client";
import { toast } from "react-toastify";

const columns = ({
  onEdit,
  onDelete,
  onSelect,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
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
        <IconButton color="info" onClick={() => onSelect(record["_id"])}>
          <MagnifyingGlassIcon width={20} />
        </IconButton>
      </div>
    ),
    sticky: true,
    width: "150px",
  },
  {
    key: "image",
    label: "image",
    width: "75px",
    render: (value: string, record: ICategoryResponse) =>
      value && (
        <Image src={value} width={20} height={20} alt={record.name || ""} />
      ),
  },
  { key: "name", label: "name" },
];

export const CategoryListPage = () => {
  const { push } = useRouter();

  const [pagination, setPagination] =
    useState<ICTablePaginationProps>(DEFAULT_PAGINATION);

  const [modalData, setModalData] = useState<ICategoryForm | null>(null);

  const [deleteData, setDeleteData] = useState<string | null>(null);

  const { data, mutate } = useSWR(
    ["categories", pagination.size, pagination.page],
    () => categoryAPI.get(pagination)
  );

  const categories = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  const onCreate = () => {
    setModalData({ name: "", image: null });
  };

  const handleCreate = async (data: ICategoryForm) => {
    const _data: ICategoryRequest = { name: data.name };
    try {
      if (data.image) {
        const res = await imageAPIClient.upload(data.image);
        _data["image_id"] = res.data._id;
      }

      const _res = await categoryAPI.create(_data);

      mutate();

      return _res;
    } catch {
      return null;
    }
  };

  const onEdit = (id: string) => {
    const find = categories.find((x) => x._id === id);

    setModalData({ id, image: find?.image, name: find?.name as string });
  };

  const handleEdit = async (data: ICategoryForm) => {
    const _data: ICategoryRequest = {
      name: data.name,
    };
    try {
      if (data.image) {
        const res = await imageAPIClient.upload(data.image);
        _data["image_id"] = res.data._id;
      }

      const _res = await categoryAPI.update(modalData?.id as string, _data);

      mutate();

      return _res;
    } catch (e) {
      return null;
    }
  };

  const onDelete = (id: string) => {
    setDeleteData(id);
  };

  const onSelect = (id: string) => {
    push({ pathname: CMS_ROUTES.RESOURCES.INDEX.path, query: { id } });
  };

  const onClose = () => {
    setModalData(null);
  };

  const onOk = async () => {
    if (deleteData) {
      const res = await categoryAPI.delete(deleteData);

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
      <div className="flex justify-between mb-4 items-center">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography component={"h1"} className="text-xl mb-4">
            Categories List
          </Typography>
        </Breadcrumbs>

        <Button variant="contained" onClick={onCreate}>
          Create
        </Button>
      </div>
      <CTable
        name="categories-list"
        data={categories}
        columns={columns({ onEdit, onDelete, onSelect })}
        pagination={pagination}
        onChange={setPagination}
      />

      {modalData && (
        <MForm
          category={modalData}
          onSubmit={modalData?.id ? handleEdit : handleCreate}
          onClose={onClose}
        />
      )}

      <CDeleteDialog open={!!deleteData} onOk={onOk} onCancel={onCancel} />
    </>
  );
};
