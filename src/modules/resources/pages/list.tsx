import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { categoryAPI } from "src/apis/category";
import { imageAPI } from "src/apis/image";
import { IImageResponse } from "src/apis/image/types";
import { CSpinner, CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/types";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { CMS_ROUTES } from "src/common/constants/routes";
import useSWR from "swr";
import { MForm } from "../components/MForm";
import { IResourceForm } from "../components/MForm/types";
import { imageAPIClient } from "src/apis/image/client";

const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ICTableColumnsProps<IImageResponse>[] => [
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
    width: "150px",
  },
  {
    key: "url",
    label: "url",
    width: "75px",
    render: (value: string, record: any) => (
      <Image src={value} alt={record.name} width={100} height={100} />
    ),
  },
  { key: "key", label: "key" },
  { key: "name", label: "name" },
];

export const ResourcesListPage = () => {
  const { push, query } = useRouter();

  const [pagination, setPagination] =
    useState<ICTablePaginationProps>(DEFAULT_PAGINATION);

  const [modalData, setModalData] = useState<IResourceForm | null>(null);

  const [deleteData, setDeleteData] = useState<string | null>(null);

  const { data: category, isLoading: categoryLoading } = useSWR(
    ["category", query["id"]],
    () => categoryAPI.getById(query["id"] as string).then((res) => res.data)
  );

  const { data, isLoading, mutate } = useSWR(
    ["images", query["id"], pagination.size, pagination.page],
    () => imageAPI.get({ ...pagination, category_id: query["id"] as string })
  );

  const images = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  const onCreate = () => {
    setModalData({
      key: "",
    });
  };

  const handleCreate = async (data: IResourceForm) => {
    try {
      if (!data.image) {
        return null;
      }

      const res = await imageAPIClient.upload(data.image);

      const _res = await imageAPI
        .update(res.data._id, {
          key: data.key,
          category_id: query["id"] as string,
        })
        .then((res) => res.data);

      mutate();

      return _res;
    } catch {
      return null;
    }
  };

  const onEdit = (id: string) => {
    const find = images.find((x) => x._id === id);

    if (find) {
      setModalData({ id: find._id, key: find.key, url: find.url });
    }
  };

  const handleEdit = async (data: IResourceForm) => {
    try {
      const _res = await imageAPI
        .update(modalData?.id as string, {
          key: data.key,
          category_id: query["id"] as string,
        })
        .then((res) => res.data);

      mutate();

      return _res;
    } catch {
      return null;
    }
  };

  const onDelete = (id: string) => {
    // console.log(id);
  };

  const onClose = () => {
    setModalData(null);
  };

  const onRedirect = (e: any) => {
    e.preventDefault();
    push(CMS_ROUTES.CATEGORY.INDEX.path);
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pages: data?.data?.pages || 0,
      total: data?.data?.total || 0,
    });
  }, [data]);

  if (categoryLoading) {
    return (
      <Box
        component="div"
        className="w-full h-[100vh] flex justify-center items-center"
      >
        <CSpinner />
      </Box>
    );
  }

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href={CMS_ROUTES.CATEGORY.INDEX.path} onClick={onRedirect}>
            <Typography component={"h1"} className="text-xl mb-4">
              Categories List
            </Typography>
          </Link>
          <Typography component={"h1"} className="text-xl mb-4">
            Images List Of ({category?.name})
          </Typography>
        </Breadcrumbs>

        <Button variant="contained" onClick={onCreate}>
          Create
        </Button>
      </div>

      <CTable
        name="categories-list"
        data={images}
        columns={columns({ onEdit, onDelete })}
        pagination={pagination}
        onChange={setPagination}
      />

      {modalData && (
        <MForm
          resource={modalData}
          onSubmit={modalData.id ? handleEdit : handleCreate}
          onClose={onClose}
        />
      )}
    </>
  );
};
