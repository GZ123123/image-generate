import Link from "next/link";
import { IMBlogArticleProps } from "./type";
import { classNames } from "src/utils/class-names";
import { comfortaa } from "src/common/fonts";

export const MBlogArticle = ({ blog }: IMBlogArticleProps) => {
  return (
    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6">
          <time dateTime={new Date(blog.created_date).toString()}>
            {blog.created_date}
          </time>
        </dd>
      </dl>
      <div className="space-y-3 xl:col-span-3">
        <div>
          <h3
            className={classNames(
              comfortaa.className,
              "text-2xl font-bold leading-8 pb-2"
            )}
          >
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
  );
};
