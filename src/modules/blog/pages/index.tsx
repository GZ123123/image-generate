import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import { blogAPIClient } from "src/apis/blog/client";
import { MBlogArticle } from "../components/MBlogArticle";
import { MBlogSearch } from "../components/MBlogSearch";

export const BlogPage = () => {
  const { query } = useRouter();

  const [q, setQ] = useState<string>("");

  const page = useMemo(() => {
    return parseInt(query["page"] as string) || 1;
  }, [query]);

  const { data } = useSWR(
    () => (q ? ["blogs", page, q] : ["blogs", page]),
    () => blogAPIClient.get({ q, page }).then((res) => res.data)
  );

  const blogs = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const pages = useMemo(() => {
    return data?.pages || 0;
  }, [data]);

  const onSearch = (value: string) => {
    setQ(value);
  };

  return (
    <div className="pb-16 pt-2 sm:pt-0">
      <MBlogSearch onSearch={onSearch} />

      <div className="mt-4 border-t border-gray-200 dark:border-gray-700">
        <ul>
          {blogs?.map((blog) => (
            <li key={blog._id} className="py-4">
              <MBlogArticle blog={blog} />
            </li>
          ))}
        </ul>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <nav className="flex justify-between">
            <Link
              aria-disabled={page === 1}
              href={{ pathname: "/blog", query: { page: page - 1 } }}
            >
              <button rel="next">Previous</button>
            </Link>

            <span>
              {page} of {pages}
            </span>
            <Link
              aria-disabled={page === pages}
              href={{ pathname: "/blog", query: { page: page + 1 } }}
            >
              <button rel="next">Next</button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};