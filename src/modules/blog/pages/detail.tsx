import Link from "next/link";
import { IPublicBlogResponse } from "src/apis/blog/types";
import { MBlogComment } from 'src/modules/blog-comment/components/MBlogClientComments';
import { MBookClient } from 'src/modules/book/components/MBookClient';

export const MBlogDetail = ({ blog }: { blog: IPublicBlogResponse }) => {
  return (
    <article>
      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={new Date(blog.created_date).toString()}>
                    {blog.created_date}
                  </time>
                </dd>
              </div>
            </dl>
            <div>
              <h1 className="text-3xl font-extrabold leading-9 pt-2 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {blog.title}
              </h1>
            </div>
          </div>
        </header>

        <div
          className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
            <dt className="sr-only">Authors</dt>
            <dd>
              <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                <li className="flex items-center space-x-2">
                  <dl className="whitespace-nowrap text-sm font-medium leading-5">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900 dark:text-gray-100">
                      {blog.author.fullname}
                    </dd>
                    <dt className="sr-only">Twitter</dt>
                    <dd>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={blog.author.username}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        @{blog.author.username}
                      </Link>
                    </dd>
                  </dl>
                </li>
              </ul>
            </dd>
          </dl>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose prose-li:my-1 prose-pre:my-2 prose-img:my-2 text-base sm:text-xl leading-normal sm:leading-relaxed max-w-none pt-10 pb-8 dark:prose-dark">
              <div
                className="ck-content client" 
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
            </div>

            <MBookClient />

            <MBlogComment blogId={blog._id} className="py-8" />
          </div>

          <footer>
            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              <div className="py-4 xl:py-8">
                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
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
              <div className="md:flex justify-between py-4 xl:block xl:space-y-8 xl:py-8 gap-x-2">
                {blog.prev_blog && (
                  <div className="flex-1">
                    <h2 className="uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Previous Article
                    </h2>
                    <div className="text-magenta-600 py-2 text-lg hover:text-slate-600 dark:hover:text-slate-400">
                      <Link href={`/blog/${blog.prev_blog.slug}`}>
                        {blog.prev_blog.title}
                      </Link>
                    </div>
                  </div>
                )}
                {blog.next_blog && (
                  <div className="flex-1">
                    <h2 className="uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Next Article
                    </h2>
                    <div className="text-magenta-600 py-2 text-lg hover:text-slate-600 dark:hover:text-slate-400">
                      <Link href={`/blog/${blog.next_blog.slug}`}>
                        {blog.next_blog.title}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-4 xl:pt-8">
              <Link
                className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
                href="/blog"
              >
                ← Back to the blog
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
};
