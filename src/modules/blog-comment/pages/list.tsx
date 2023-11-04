import useSWR from "swr";
import {
  Breadcrumbs,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { CTable } from "src/common/components/others";
import {
  ICTableColumnsProps,
  ICTablePaginationProps,
} from "src/common/components/others/types";
import { DEFAULT_PAGINATION } from "src/common/constants/default";
import { IBlogCommentsResponse } from 'src/apis/blog-comment/types';
import { blogCommentAPI } from 'src/apis';

const columns = ({
  onHidden,
}: {
  onHidden: (id: string) => void;
}): ICTableColumnsProps<IBlogCommentsResponse>[] => [
  {
    key: "action",
    label: "Hidden?",
    render: (_, record) => (
      <Switch defaultChecked={record.is_hidden} onChange={() => onHidden(record._id)} />
    ),
    sticky: true,
  },
  { key: "blog_name", label: "Blog", width: "200px" },
  { 
    key: "content", 
    label: "Content", 
    width: "500px", 
    render: (_, record) => (
      <p className="whitespace-pre-line">{record.content}</p>
    ),
  },
  { key: "email", label: "Email" },
  { key: "created_by", label: "created by" },
  { 
    key: "created_date", 
    label: "created date",
    render: (_, record) => (
      <p>{new Date(record.created_date).toLocaleDateString()}</p>
    ),
  },
];

export const BlogCommentListPage = () => {
  // const [q, setQ] = useState("");

  const [pagination, setPagination] =
    useState<ICTablePaginationProps>(DEFAULT_PAGINATION);

  const { data } = useSWR(
    ["blog_commentss", pagination.size, pagination.page],
    () => blogCommentAPI.get({ ...pagination })
  );

  const blogComments = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  const onHidden = async (id: string) => {
    await blogCommentAPI.hidden(id);
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pages: data?.data?.pages || 0,
      total: data?.data?.total || 0,
    });
  }, [data]);

  // const onSearch = useDebounce((e: any) => {
  //   setQ(e.target.value);
  //   setPagination({ ...pagination, page: 1, pages: 0 });
  // }, 400);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography component={"h1"} className="text-xl mb-4">
            Blog Comments List
          </Typography>
        </Breadcrumbs>
      </div>

      {/* <div className="py-4 flex justify-end">
        <Paper>
          <CInput
            onChange={onSearch}
            className="max-w-[250px] px-2 py-1"
            append={<MagnifyingGlassIcon width={20} />}
          />
        </Paper>
      </div> */}

      <CTable
        name="blog-comments-list"
        data={blogComments}
        columns={columns({ onHidden })}
        pagination={pagination}
        onChange={setPagination}
      />
    </>
  );
};
