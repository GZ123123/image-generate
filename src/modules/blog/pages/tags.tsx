import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { blogAPIClient } from "src/apis/blog/client";
import useSWR from "swr";
import { MBlogArticle } from "../components/MBlogArticle";
import { MBlogSearch } from "../components/MBlogSearch";
import { CSpinner } from "src/common/components/others";

export const MBlogTags = () => {
  const { query, push } = useRouter();

  const page = useMemo(() => parseInt(query["page"] as string) || 1, [query]);

  const { data, isLoading, mutate } = useSWR(
    () =>
      query?.q
        ? ["blogs", "tag", query.slug, page]
        : ["blogs", "tag", query.slug, page, query.q],
    () =>
      blogAPIClient
        .getByHashtag(query.slug as string, { q: query?.q as string, page })
        .then((res) => res.data)
  );

  const blogs = useMemo(() => data?.data ?? [], [data]);

  const pages = useMemo(() => data?.pages ?? 1, [data]);

  const onSearch = (value: string) => {
    push({ pathname: window.location.pathname, query: { q: value } });
    setTimeout(mutate, 100);
  };

  return (
    <div className="pb-16 pt-2 sm:pt-0">
      <MBlogSearch title={query.slug as string} onSearch={onSearch} />

      <div className="mt-4 border-t border-gray-200 dark:border-gray-700">
        <ul>
          {isLoading ? (
            <li
              className="flex justify-center items-center"
              style={{ height: "250px" }}
            >
              <CSpinner />
            </li>
          ) : (
            blogs?.map((blog) => (
              <li key={blog._id} className="py-4">
                <MBlogArticle blog={blog} />
              </li>
            ))
          )}
        </ul>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <nav className="flex justify-between">
            {page <= 1 ? (
              <button>Previous</button>
            ) : (
              <Link
                href={{
                  pathname: `/tags/${query.slug}`,
                  query: { ...query, page: page - 1 },
                }}
              >
                <button rel="next">Previous</button>
              </Link>
            )}

            <span>
              {page} of {pages}
            </span>

            {page >= pages ? (
              <button>Next</button>
            ) : (
              <Link
                aria-disabled={page === pages}
                href={{
                  pathname: `/tags/${query.slug}`,
                  query: { ...query, page: page + 1 },
                }}
              >
                <button rel="next">Next</button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
