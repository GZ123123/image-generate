import Link from "next/link";
import { IBlogPage } from "../type";

export const BlogPage = ({ blogs }: IBlogPage) => {
  console.log(blogs);
  return (
    <div className="pb-16 pt-2 sm:pt-0">
      <div className="flex items-start">
        <h1 className="flex-1 text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Blog.
        </h1>
        <div>
          <div>
            <label className="hidden sm:flex items-center border border-gray-300 dark:border-gray-600 text-gray-500 dark:bg-[#131624] bg-[#F6F8FF] rounded py-1 px-2">
              <input
                aria-label="Search articles"
                type="text"
                className="px-2 py-0 flex-1 dark:bg-[#131624] bg-[#F6F8FF] dark:text-white text-black dark:placeholder-gray-700 border-none focus:outline-none focus:ring-0"
                placeholder="Search articles"
              />
              <div className="flex items-center gap-1 text-gray-500 select-none cursor-text">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </label>
            <div className="sm:hidden flex p-2 border border-gray-300 dark:border-gray-600 text-gray-500 rounded">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ul>
        {blogs?.map((blog) => (
          <li key={blog._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6">
                  <time dateTime={new Date(blog.created_date).toISOString()}>
                    {blog.created_date}
                  </time>
                </dd>
              </dl>
              <div className="space-y-3 xl:col-span-3">
                <div>
                  <h3 className="text-2xl font-bold leading-8 pb-2">
                    <Link
                      className="text-gray-900 dark:text-gray-100"
                      href={`/blog/${blog.slug}`}
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.hashtags?.map((tag) => (
                      <Link
                        key={tag._id}
                        className="px-2 py-1 rounded-md dark:bg-slate-800 bg-slate-200 text-sm font-bold uppercase text-slate-700 dark:text-slate-200 hover:text-magenta-400 dark:hover:text-magenta-400"
                        href={`/tags/${tag.slug}`}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="max-w-none text-slate-700 dark:text-slate-400">
                  {blog.description}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};
